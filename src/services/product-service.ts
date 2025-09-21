import { ProductParams } from "@/models/products/product-params";
import { api } from "./api";
import { ProductDetail } from "../models/products/product-detail";
import { CustomerProduct } from "@/models/products/customer-product";

export const productService = {
  getProductsForCostumer: (productParams?: ProductParams) =>
    api.get<CustomerProduct>(`/product/customer/products`, {
      params: productParams,
    }),
  getProductDetail: (id: string) => api.get<ProductDetail>(`/product/${id}`),
};
