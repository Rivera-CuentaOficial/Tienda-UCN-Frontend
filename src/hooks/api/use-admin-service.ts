import { useMutation, useQuery } from "@tanstack/react-query";

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
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await adminService.toggleProductAvailability(id);
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
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};
