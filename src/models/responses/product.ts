export interface ProductForCustomerResponse {
  id: number;
  title: string;
  description: string;
  mainImageURL: string;
  price: string;
  discount: number;
}

export interface ProductListForCustomerResponse {
  products: ProductForCustomerResponse[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface ProductDetailForCustomerResponse {
  id: number;
  title: string;
  description: string;
  imagesURL: string[];
  price: string;
  discount: number;
  stock: number;
  stockIndicator: string;
  categoryName: string;
  brandName: string;
  statusName: string;
  isAvailable: boolean;
}

export interface ProductDetailForAdminResponse {
  id: number;
  title: string;
  description: string;
  price: string;
  discount: number;
  stock: number;
  isAvailable: boolean;
  categoryName: string;
  brandName: string;
  status: string;
  isDeleted: boolean;
  imagesURL: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ProductForAdminResponse {
  id: number;
  title: string;
  mainImageURL: string;
  price: string;
  stock: number;
  stockIndicator: string;
  categoryName: string;
  brandName: string;
  statusName: string;
  isAvailable: boolean;
  updatedAt: string;
}

export interface ProductListForAdminResponse {
  products: ProductForAdminResponse[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
