export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export enum Sizes {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  size: Sizes;
  totalPrice: number;
}
