export {
  useApplyDiscountMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductDetailForAdmin,
  useGetProductsForAdmin,
  useToggleProductAvailabilityMutation,
  useUpdateProductMutation,
} from "./use-admin-service";
export {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResendCodeMutation,
  useVerifyEmailMutation,
} from "./use-auth-service";
export {
  useAddItemToCartMutation,
  useCheckoutMutation,
  useClearCartMutation,
  useGetCart,
  useRemoveItemFromCartMutation,
  useUpdateQuantityMutation,
} from "./use-cart-service";
export {
  useCreateOrderMutation,
  useGetOrderDetail,
  useGetOrdersList,
} from "./use-order-service";
export {
  useGetProductDetail,
  useGetProductsForCustomer,
} from "./use-product-service";
