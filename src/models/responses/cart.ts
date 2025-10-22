export interface CartItem {
  productId: number;
  productTitle: string;
  productImageUrl: string;
  price: number;
  quantity: number;
  discount: number;
  subTotalPrice: string;
  totalPrice: string;
}

export interface GetCartResponse {
  buyerId: string;
  userId: number | null;
  items: Array<CartItem>;
  subTotalPrice: string;
  totalPrice: string;
}
