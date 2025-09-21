import { CustomerProductData } from "./customer-product-data";

export interface CustomerProduct {
  message: string;
  data: {
    products: CustomerProductData[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}
