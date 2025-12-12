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

export const useGetProductDetailForAdmin = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["products", "admin", "detail", id],
    queryFn: async () => {
      const response = await adminService.getProductDetail(id);
      return response.data;
    },
    enabled: enabled && isValidId(id),
    staleTime: 5 * 60 * 1000,
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
