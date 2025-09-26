import { useQuery } from "@tanstack/react-query";

import { stringRegexValidation } from "@/lib";
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
  const isValidId = stringRegexValidation(id, /^[1-9]\d*$/);

  return useQuery({
    queryKey: ["products", "detail", id],
    queryFn: async () => {
      const response = await productService.getProductDetail(id);
      return response.data;
    },
    enabled: enabled && isValidId,
    staleTime: 5 * 60 * 1000,
  });
};
