import { useRouter } from "next/navigation";

import { useGetProductDetail } from "@/hooks/api";

export const useProductDetail = (id: string) => {
  // State
  const router = useRouter();

  // API calls
  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useGetProductDetail(id);

  // Computed values
  const productDetail = queryData?.data;

  // Actions
  const handleGoToProducts = () => {
    router.push("/products");
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

  return {
    // Data
    productDetail,
    isLoading,
    error,

    // Actions
    actions: {
      handleGoToProducts,
      handleRetry,
      handleCalculateDiscountedPrice,
    },
  };
};
