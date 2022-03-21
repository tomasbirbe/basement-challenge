import { CartItem } from "../types/types";

export default function orderCart(cart: CartItem[]): CartItem[] {
  return cart.sort((a: CartItem, b: CartItem) => {
    if (a.product.name.localeCompare(b.product.name) < 1) {
      return 1;
    } else {
      return -1;
    }
  });
}
