import Image from "next/image";

import { CartItem, Sizes } from "../types/types";
import orderCart from "../utils/order";

interface Props {
  cartState: [cart: CartItem[], setCart: (cart: CartItem[]) => void];
  closeCart: () => void;
}

export default function Cart({ cartState, closeCart }: Props) {
  const [cart, setCart] = cartState;

  function changeSize(cartItem: CartItem, newSize: Sizes) {
    const modifiedCart = cart.filter((item) => item.id !== cartItem.id);

    modifiedCart.push({ ...cartItem, size: newSize });

    setCart(orderCart(modifiedCart));
  }

  function incrementQuantity(cartItem: CartItem) {
    const modifiedCart = cart.filter((item) => item.id !== cartItem.id);

    const totalPrice = parseFloat((cartItem.product.price * (cartItem.quantity + 1)).toFixed(2));

    modifiedCart.push({
      ...cartItem,
      quantity: cartItem.quantity + 1,
      totalPrice,
    });

    setCart(orderCart(modifiedCart));
  }

  function decrementQuantity(cartItem: CartItem) {
    const modifiedCart = cart.filter((item: CartItem) => item.id !== cartItem.id);

    if (cartItem.quantity > 1) {
      const totalPrice = parseFloat((cartItem.product.price * (cartItem.quantity - 1)).toFixed(2));

      modifiedCart.push({
        ...cartItem,
        quantity: cartItem.quantity - 1,
        totalPrice,
      });

      setCart(orderCart(modifiedCart));
    }
  }

  function changeQuantity(cartItem: CartItem, quantity: string) {
    if (quantity !== "") {
      const newQuantity = parseInt(quantity, 10);
      const modifiedCart = cart.filter((item: CartItem) => item.id !== cartItem.id);
      const totalPrice = parseFloat((cartItem.product.price * newQuantity).toFixed(2));

      modifiedCart.push({
        ...cartItem,
        quantity: newQuantity,
        totalPrice,
      });
      setCart(orderCart(modifiedCart));
    } else {
      const modifiedCart = cart.filter((item: CartItem) => item.id !== cartItem.id);

      modifiedCart.push({ ...cartItem, quantity: 0 });
      setCart(orderCart(modifiedCart));
    }
  }

  function calculateTotal() {
    return cart.reduce((acc: number, cartItem: CartItem) => cartItem.totalPrice + acc, 0);
  }

  return (
    <>
      <div className="w-full h-full flex overflow-auto flex-col">
        <div className="pt-4 px-4 w-full flex justify-end">
          <button className="px-4 text-2xl" onClick={closeCart}>
            → CLOSE
          </button>
        </div>
        <div className="flex flex-col sm:flex-row text-8.5xl lg:text-cart-title sm:gap-6 m-auto lg:px-8">
          <span>YOUR</span>
          <span className="hollow text-black">CART</span>
        </div>
        <div className="w-full px-8 pb-10 max-cart-screen overflow-auto flex flex-col gap-8">
          {cart.map((cartItem) => (
            <div
              key={cartItem.id}
              className="py-4 px-6 border flex flex-col sm:flex-row items-center gap-4 relative border-white w-full"
            >
              <div className="bg-gradient-to-t w-fit from-starter-gradient to-ending-gradient">
                <Image
                  alt="A preview of a product"
                  height={230}
                  src={cartItem.product.image}
                  width={210}
                />
              </div>
              <div className="flex flex-col justify-between gap-4 pl-4">
                <div>
                  <p className="text-2xl lg:text-3xl uppercase">{cartItem.product.name}</p>
                  <p className="opacity-50 text-xl lg:text-2xl">{cartItem.product.description}</p>
                </div>
                <div className="text-base gap-4 flex flex-col">
                  <div className="text-base sm:text-xl lg:text-2xl flex gap-2 flex-col items-start lg:flex-row lg:items-center">
                    <p className="">QUANTITY:</p>
                    <div className="flex items-center justify-center py-1 px-2 w-32 border border-white rounded-full">
                      <button className="w-1/3" onClick={() => decrementQuantity(cartItem)}>
                        -
                      </button>
                      <input
                        className="w-2/3 bg-transparent text-center"
                        type="number"
                        value={cartItem.quantity}
                        onChange={(e) => changeQuantity(cartItem, e.target.value)}
                      />
                      <button className="w-1/3" onClick={() => incrementQuantity(cartItem)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center text-base sm:text-xl lg:text-2xl">
                    <p className="mr-2">SIZE:</p>
                    <button
                      className={`${
                        cartItem.size === Sizes.S ? "outline-custom" : ""
                      } rounded-full px-2`}
                      onClick={() => changeSize(cartItem, Sizes.S)}
                    >
                      S
                    </button>
                    <button
                      className={`${
                        cartItem.size === Sizes.M ? "outline-custom" : ""
                      } rounded-full px-2`}
                      onClick={() => changeSize(cartItem, Sizes.M)}
                    >
                      M
                    </button>
                    <button
                      className={`${
                        cartItem.size === Sizes.L ? "outline-custom" : ""
                      } rounded-full px-2`}
                      onClick={() => changeSize(cartItem, Sizes.L)}
                    >
                      L
                    </button>
                    <button
                      className={`${
                        cartItem.size === Sizes.XL ? "outline-custom" : ""
                      } rounded-full px-2`}
                      onClick={() => changeSize(cartItem, Sizes.XL)}
                    >
                      XL
                    </button>
                  </div>
                </div>
                <div className="lg:absolute lg:bottom-2 lg:right-3 text-xl lg:text-4xl">
                  ${cartItem.totalPrice}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-between border-t-0 lg:border-t px-4 md:px-0">
        <div className="text-2xl flex justify-between lg:justify-start lg:gap-4 sm:text-4xl pl-6 py-4 md:py-2 lg:py-4 w-full lg:w-3/5 flex-2 border-b lg:border-r lg:border-b-0">
          <span>TOTAL:</span>
          <span>${calculateTotal()}</span>
        </div>
        <button className="text-6xl lg:w-2/5  lg:text-4xl py-4 hollow text-black">CHECKOUT</button>
      </div>
    </>
  );
}
