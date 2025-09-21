import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ProductParams } from "@/models/products/product-params";
import { productService } from "@/services/product-service";
import { useState } from "react";
import { getErrorDetails } from "@/lib/utils";

const useProductsForCustomer = (params: ProductParams = {}) => {
  return useQuery({
    queryKey: ["products", "customer", params],
    queryFn: () => productService.getProductsForCostumer(params),
    staleTime: 5 * 60 * 1000,
    select: (data) => ({
      products: data.data.data,
    }),
    placeholderData: keepPreviousData,
    retry: (failureCount, error) => {
      const errorDetails = getErrorDetails(error);

      if (!errorDetails.canRetry) {
        return false;
      }

      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => {
      return Math.min(1000 * 2 ** attemptIndex, 8000);
    },
  });
};

/*
export const useProductDetail = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["products", "detail", id],
    queryFn: () => productService.getProductDetail(id),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
    select: (data) => data.data.data,
    retry: (failureCount, error: any) => {
      const errorDetails = getErrorDetails(error);

      if (!errorDetails.canRetry) {
        return false;
      }

      return failureCount < 2;
    },
  });
};
*/

export const useProductsWithFilters = () => {
  const [filters, setFilters] = useState<ProductParams>({
    pageNumber: 1,
    pageSize: 10,
    searchTerm: "",
  });

  const productsQuery = useProductsForCustomer(filters);

  const updateFilters = (newFilters: Partial<ProductParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      pageNumber: 1,
      pageSize: 10,
      searchTerm: "",
    });
  };

  const goToPage = (page: number) => {
    updateFilters({ pageNumber: page });
  };

  const search = (searchTerm: string) => {
    updateFilters({ searchTerm, pageNumber: 1 });
  };

  const changePageSize = (pageSize: number) => {
    updateFilters({ pageSize, pageNumber: 1 });
  };

  return {
    ...productsQuery,
    filters,
    updateFilters,
    resetFilters,
    goToPage,
    search,
    changePageSize,
  };
};
