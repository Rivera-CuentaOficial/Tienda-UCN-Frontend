import { AxiosRequestConfig } from "axios";

import { ApiResponse } from "@/models/generics";
import { PaginationQueryParams } from "@/models/requests";
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
  createProduct(productFormData: FormData) {
    return this.httpClient.post<ApiResponse<string>>(
      `${this.baseURL}/products`,
      productFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }
}

export const adminService = new AdminService();
