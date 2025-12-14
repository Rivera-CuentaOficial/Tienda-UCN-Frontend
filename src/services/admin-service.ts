import { AxiosRequestConfig } from "axios";

import { ApiResponse } from "@/models/generics";
import { ApplyDiscountRequest, PaginationQueryParams } from "@/models/requests";
import {
  ProductDetailForAdminResponse,
  ProductListForAdminResponse,
} from "@/models/responses";

import { BaseApiService } from "./base-api-service";

export class AdminService extends BaseApiService {
  constructor() {
    super("/admin");
  }

  getProductsForAdmin(params?: PaginationQueryParams) {
    return this.httpClient.get<ApiResponse<ProductListForAdminResponse>>(
      `${this.baseURL}/products`,
      { params } as AxiosRequestConfig
    );
  }

  getProductDetail(id: string) {
    return this.httpClient.get<ApiResponse<ProductDetailForAdminResponse>>(
      `${this.baseURL}/products/${id}`
    );
  }

  toggleProductAvailability(id: string) {
    return this.httpClient.patch<ApiResponse<string>>(
      `${this.baseURL}/products/${id}/toggle-status`
    );
  }

  deleteProduct(id: string) {
    return this.httpClient.delete<ApiResponse<string>>(
      `${this.baseURL}/products/${id}`
    );
  }

  createProduct(productFormData: FormData) {
    return this.httpClient.post<ApiResponse<string>>(
      `${this.baseURL}/products`,
      productFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }

  updateProduct(id: string, productFormData: FormData) {
    return this.httpClient.put<ApiResponse<string>>(
      `${this.baseURL}/products/${id}`,
      productFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }

  applyDiscount(id: string, discount: number) {
    const requestBody: ApplyDiscountRequest = {
      discount: discount,
    };
    return this.httpClient.patch<ApiResponse<string>>(
      `${this.baseURL}/products/${id}/discount`,
      requestBody
    );
  }
}

export const adminService = new AdminService();
