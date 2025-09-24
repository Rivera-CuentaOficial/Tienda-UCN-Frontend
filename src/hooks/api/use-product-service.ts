import { useQuery } from "@tanstack/react-query";

import { PaginationQueryParams } from "@/models/requests";
import { productService } from "@/services";

export const useGetProductsForCustomer = (
  params: PaginationQueryParams = { pageNumber: 1 }
) => {
  return useQuery({
    queryKey: ["products", "customer", params],
    queryFn: async () => {
      const response = await productService.getProductsForCustomer(params);
      return response.data;
    },
  });
};

export const useGetProductDetail = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["products", "detail", id],
    queryFn: async () => {
      const response = await productService.getProductDetail(id);
      return response.data;
    },
    enabled: !!id && enabled,
  });
};
