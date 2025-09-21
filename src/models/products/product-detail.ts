export interface ProductDetail {
  message: string;
  data: ProductDetailData;
}

interface ProductDetailData {
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
