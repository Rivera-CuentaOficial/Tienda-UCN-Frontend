import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  useApplyDiscountMutation,
  useDeleteProductMutation,
  useGetProductDetailForAdmin,
  useToggleProductAvailabilityMutation,
} from "@/hooks/api";
import { handleApiError } from "@/lib";
import { ApiResponse } from "@/models/generics";
import { ProductDetailForAdminResponse } from "@/models/responses";

export const useProductDetailAdmin = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [toggledProductId, setToggledProductId] = useState<string | null>(null);
  const [updatingDiscount, setUpdatingDiscount] = useState(false);

  // API calls
  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailForAdmin(id);

  const { mutateAsync: toggleProductAvailability, isPending: isToggling } =
    useToggleProductAvailabilityMutation();
  const { mutateAsync: deleteProduct, isPending: isDeleting } =
    useDeleteProductMutation();
  const { mutateAsync: applyDiscount, isPending: isUpdatingDiscount } =
    useApplyDiscountMutation();

  const productDetail = queryData?.data;

  // Actions
  const handleGoBack = () => {
    router.push("/admin/products");
  };

  const handleRetry = () => {
    refetch();
  };

  const handleCalculateDiscountedPrice = (price: string, discount: number) => {
    const cleanPrice = parseFloat(
      price.replaceAll(",", "").replace(".", ",").replace("$", "")
    );
    return (cleanPrice * (1 - discount * 0.01)).toFixed(2);
  };

  const handleToggleAvailability = async (id: string) => {
    if (!productDetail) return;
    try {
      setToggledProductId(id);
      queryClient.setQueryData(
        ["products", "admin", "detail", id],
        (oldData: ApiResponse<ProductDetailForAdminResponse>) => {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              isAvailable: !oldData.data.isAvailable,
            },
          };
        }
      );
      await toggleProductAvailability(id);
      toast.success(
        `Producto ${productDetail.isAvailable ? "desactivado" : "activado"} exitosamente`
      );
    } catch (err) {
      refetch();
      const apiError = handleApiError(err);
      toast.error(apiError.details || "Error al cambiar estado del producto");
    }
  };

  const handleDelete = async (id: string) => {
    if (!productDetail) return;
    try {
      queryClient.setQueryData(
        ["products", "admin", "detail", id],
        (oldData: ApiResponse<ProductDetailForAdminResponse>) => {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              isDeleted: !oldData.data.isDeleted,
            },
          };
        }
      );
      await deleteProduct(id);
      toast.success("Producto eliminado exitosamente");
    } catch (err) {
      refetch();
      const apiError = handleApiError(err);
      toast.error(apiError.details || "Error al eliminar el producto");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/products/${id}/edit`);
  };

  const handleApplyDiscount = async (discount: number) => {
    if (!productDetail) return;
    try {
      setUpdatingDiscount(true);

      // Optimistic update
      queryClient.setQueryData(
        ["products", "admin", "detail", id],
        (oldData: ApiResponse<ProductDetailForAdminResponse>) => {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              discount: discount, // Set to the new discount value
            },
          };
        }
      );

      await applyDiscount({ id, discount }); // Fixed: pass discount, not discountValue
      toast.success(`Descuento aplicado exitosamente`);
    } catch (err) {
      refetch();
      const apiError = handleApiError(err);
      toast.error(apiError.details || "Error al aplicar el descuento");
    } finally {
      setUpdatingDiscount(false);
    }
  };

  return {
    // Data
    productDetail,
    isLoading,
    error,
    toggledProductId,
    updatingDiscount,

    // Error
    isToggling,
    isDeleting,
    isUpdatingDiscount,

    // Actions
    actions: {
      handleApplyDiscount,
      handleEdit,
      handleGoBack,
      handleRetry,
      handleCalculateDiscountedPrice,
      handleToggleAvailability,
      handleDelete,
    },
  };
};
