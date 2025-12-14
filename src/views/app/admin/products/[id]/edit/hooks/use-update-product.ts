import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  useGetProductDetailForAdmin,
  useUpdateProductMutation,
} from "@/hooks/api";
import { convertUrlsToFiles, handleApiError, parsePrice } from "@/lib";
import { UpdateProductRequest } from "@/models/requests";

export const useUpdateProduct = (productId: string) => {
  // Router
  const router = useRouter();
  const [initialImages, setInitialImages] = useState<File[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  // Fetch existing data
  const { data: existingProductData, isLoading: isFetching } =
    useGetProductDetailForAdmin(productId, true);
  const productDetail = existingProductData?.data;

  // API calls
  const { mutateAsync: updateProductAsync, isPending: isUpdatingProduct } =
    useUpdateProductMutation();

  // Load existing images as File objects
  useEffect(() => {
    if (productDetail?.imagesURL) {
      setIsLoadingImages(true);
      convertUrlsToFiles(productDetail?.imagesURL)
        .then(files => {
          setInitialImages(files);
          setIsLoadingImages(false);
        })
        .catch(() => {
          setInitialImages([]);
          setIsLoadingImages(false);
        });
    } else {
      setIsLoadingImages(false);
    }
  }, [productDetail?.imagesURL]);

  // Actions
  const handleUpdateProduct = async (productData: UpdateProductRequest) => {
    try {
      const productFormData = new FormData();

      productFormData.append("title", productData.title);
      productFormData.append("description", productData.description);
      productFormData.append("price", productData.price.toString());
      productFormData.append("stock", productData.stock.toString());
      productFormData.append("status", productData.status);
      productFormData.append("categoryName", productData.categoryName);
      productFormData.append("brandName", productData.brandName);

      if (productData.images && productData.images.length > 0) {
        productData.images.forEach(image => {
          productFormData.append("images", image);
        });
      }

      await updateProductAsync({ id: productId, productFormData });
      toast.success("Producto actualizado exitosamente");
      router.push(`/admin/products/${productId}`);
    } catch (error) {
      const apiError = handleApiError(error).details;
      toast.error(apiError);
    }
  };

  return {
    // Data - only return when both product data AND images are loaded
    initialValues:
      productDetail && !isLoadingImages
        ? {
            title: productDetail.title,
            description: productDetail.description,
            price: parsePrice(productDetail.price),
            stock: productDetail.stock,
            status: productDetail.status,
            categoryName: productDetail.categoryName,
            brandName: productDetail.brandName,
            images: initialImages,
          }
        : null,
    // Loading state
    isLoading: isUpdatingProduct || isFetching || isLoadingImages,
    isLoadingImages,

    // Actions
    actions: {
      handleUpdateProduct,
    },
  };
};
