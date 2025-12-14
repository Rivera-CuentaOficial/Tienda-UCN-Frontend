import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { isValidId } from "@/lib";
import { PaginationQueryParams } from "@/models/requests";
import { adminService } from "@/services";

export const useGetProductsForAdmin = (
  params: PaginationQueryParams = { pageNumber: 1 }
) => {
  return useQuery({
    queryKey: ["products", "admin", params],
    queryFn: async () => {
      const response = await adminService.getProductsForAdmin(params);
      return response.data;
    },
  });
};

export const useToggleProductAvailabilityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await adminService.toggleProductAvailability(id);
      return response.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["products", "admin", "detail", id],
      });
      queryClient.invalidateQueries({ queryKey: ["products", "admin"] });
    },
  });
};

export const useApplyDiscountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, discount }: { id: string; discount: number }) => {
      const response = await adminService.applyDiscount(id, discount);
      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.removeQueries({
        queryKey: ["products", "admin", "detail", id],
      });
      queryClient.invalidateQueries({ queryKey: ["products", "admin"] });
    },
  });
};

export const useDeleteProductMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await adminService.deleteProduct(id);
      return response.data;
    },
  });
};

export const useGetProductDetailForAdmin = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["products", "admin", "detail", id],
    queryFn: async () => {
      const response = await adminService.getProductDetail(id);
      return response.data;
    },
    enabled: enabled && isValidId(id),
    staleTime: 5 * 60 * 1000,
    placeholderData: undefined,
  });
};

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: async (productFormData: FormData) => {
      const response = await adminService.createProduct(productFormData);
      return response.data;
    },
  });
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      productFormData,
    }: {
      id: string;
      productFormData: FormData;
    }) => {
      const response = await adminService.updateProduct(id, productFormData);
      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.removeQueries({
        queryKey: ["products", "admin", "detail", id],
      });
      queryClient.invalidateQueries({ queryKey: ["products", "admin"] });
    },
  });
};
