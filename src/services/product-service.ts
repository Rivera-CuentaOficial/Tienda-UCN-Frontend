import { AxiosRequestConfig } from "axios";

import { ApiResponse } from "@/models/generics";
import { PaginationQueryParams } from "@/models/requests";
import {
  ProductDetailForCustomerResponse,
  ProductListForCustomerResponse,
} from "@/models/responses";

import { BaseApiService } from "./base-api-service";

export class ProductService extends BaseApiService {
  constructor() {
    super("/products");
  }

  getProductsForCustomer(params?: PaginationQueryParams) {
    return this.httpClient.get<ApiResponse<ProductListForCustomerResponse>>(
      `${this.baseURL}`,
      { params } as AxiosRequestConfig
    );
  }

  getProductDetail(id: string) {
    return this.httpClient.get<ApiResponse<ProductDetailForCustomerResponse>>(
      `${this.baseURL}/${id}`
    );
  }
}

export const productService = new ProductService();
