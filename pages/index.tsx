import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Product } from "../product/types";
import api from "../services/api";

enum Sizes {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  size: Sizes;
  totalPrice: number;
}

function orderCart(cart: CartItem[]): CartItem[] {
  return cart.sort((a: CartItem, b: CartItem) => {
    if (a.product.name.localeCompare(b.product.name) < 1) {
      return 1;
    } else {
      return -1;
    }
  });
}

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);

  useEffect(() => {
    api.getProducts().then((products) => {
      setProducts(products);
    });

    setCart(
      window.localStorage.getItem("cart")
        ? JSON.parse(window.localStorage.getItem("cart") as string)
        : [],
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product: Product) {
    const isNewProduct = !cart.find((cartItem: CartItem) => cartItem.product.id === product.id);

    if (isNewProduct) {
      const cartItem: CartItem = {
        id: new Date().getTime() * Math.random() * 100,
        product,
        quantity: 1,
        size: Sizes.S,
        totalPrice: product.price,
      };

      setCart(orderCart([...cart, cartItem]));
    }
  }

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
    const modifiedCart = cart.filter((item) => item.id !== cartItem.id);

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
      const modifiedCart = cart.filter((item) => item.id !== cartItem.id);
      const totalPrice = parseFloat((cartItem.product.price * newQuantity).toFixed(2));

      modifiedCart.push({
        ...cartItem,
        quantity: newQuantity,
        totalPrice,
      });
      setCart(orderCart(modifiedCart));
    } else {
      const modifiedCart = cart.filter((item) => item.id !== cartItem.id);

      modifiedCart.push({ ...cartItem, quantity: 0 });
      setCart(orderCart(modifiedCart));
    }
  }

  function calculateTotal() {
    return cart.reduce((acc, cartItem) => cartItem.totalPrice + acc, 0);
  }

  return (
    <>
      <div
        className={
          "w-full max-w-screen-2xl m-auto relative flex flex-col items-center justify-center pt-4 gap-12"
        }
      >
        <nav className="px-6 flex flex-row justify-between w-full py-4 sticky top-0 z-10 bg-black">
          <div className="hidden md:flex md:items-center">
            <Image alt="Basement's logo" height={28} src="/logo.svg" width={192} />
          </div>
          <div className="md:hidden flex items-center">
            <Image alt="Basement's logo" height={30} src="/sm-logo.svg" width={30} />
          </div>
          <div className="hidden md:flex md:flex-row md:gap-x-4">
            <Image
              alt="Icon for decoration"
              height={22}
              src="/icons/navbar-icon-1.svg"
              width={22}
            />
            <Image
              alt="Icon for decoration"
              height={24}
              src="/icons/navbar-icon-2.svg"
              width={42}
            />
            <Image
              alt="Icon for decoration"
              height={20}
              src="/icons/navbar-icon-3.svg"
              width={82}
            />
            <Image
              alt="Icon for decoration"
              height={24}
              src="/icons/navbar-icon-4.svg"
              width={42}
            />
            <Image
              alt="Icon for decoration"
              height={21}
              src="/icons/navbar-icon-5.svg"
              width={24}
            />
          </div>
          <button
            className="font-bold font-grotesque text-lg rounded-3xl border-white border-2 px-4 py-2"
            onClick={() => setShowCart(true)}
          >
            CART ( {cart.length} )
          </button>
        </nav>
        <header className="px-6 w-full overflow-hidden flex flex-col gap-12 justiy-center items-center">
          <div className="relative w-full h-header">
            <Image alt="Banner" layout="fill" src="/header.svg" />
          </div>
          <p className="w-overflow overflow-hidden py-2 border-b border-t whitespace-nowrap text-4xl">
            A man can&apos;t have enough basement swag - A man can&apos;t have enough basement swag
          </p>
        </header>

        <main className="px-6 flex gap-3 justify-center flex-wrap">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-t relative from-starter-gradient to-ending-gradient"
            >
              <button
                className="w-full h-full flex items-center justify-center border-b border-white"
                id="image-container"
                onClick={() => addToCart(product)}
              >
                <Image alt="A preview of a product" height={560} src={product.image} width={440} />
                <div className="w-1/2 absolute h-1/2">
                  <Image
                    alt="Image of add the product to the cart"
                    id="add-to-cart"
                    layout="fill"
                    src="/add-to-cart.svg"
                  />
                </div>
              </button>
              <div className="flex justify-between pt-2 text-xl">
                <p>{product.name}</p>
                <p>${product.price}</p>
              </div>
            </div>
          ))}
        </main>
        <div className="relative w-full h-footer">
          <Image alt="A footer" layout="fill" src="/footer.svg" />
        </div>

        <div
          className={`fixed w-full lg:w-fit flex items-center max-h-screen justify-between flex-col bg-black lg:border lg:border-white top-0 right-0 z-20 ${
            showCart ? "flex" : "hidden"
          }`}
        >
          <div className="w-full h-full flex overflow-auto flex-col">
            <div className="pt-4 px-4 w-full flex justify-end">
              <button className="px-4 text-2xl" onClick={() => setShowCart(false)}>
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
                      <p className="opacity-50 text-xl lg:text-2xl">
                        {cartItem.product.description}
                      </p>
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
            <button className="text-6xl lg:w-2/5  lg:text-4xl py-4 hollow text-black">
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 z-10 w-full h-full bg-opacity-60 bg-black ${
          showCart ? "hidden md:block" : "hidden"
        }`}
        onClick={() => setShowCart(false)}
      />
    </>
  );
};

export default Home;
