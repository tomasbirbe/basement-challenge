import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

import { CartItem, Product, Sizes } from "../types/types";
import api from "../services/api";
import Cart from "../components/Cart";
import orderCart from "../utils/order";
import Nav from "../components/Nav";

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

  function closeCart() {
    setShowCart(false);
  }

  function openCart() {
    setShowCart(true);
  }

  return (
    <>
      <div
        className={
          "w-full max-w-screen-2xl m-auto relative flex flex-col items-center justify-center pt-4 gap-12"
        }
      >
        {/* Nav */}

        <Nav openCart={openCart} totalItems={cart.length} />

        {/* Header */}

        <header className="px-6 w-full overflow-hidden flex flex-col gap-12 justiy-center items-center">
          <div className="relative w-full h-header">
            <Image alt="Banner" layout="fill" src="/header.svg" />
          </div>
          <p className="w-overflow overflow-hidden py-2 border-b border-t whitespace-nowrap text-4xl">
            A man can&apos;t have enough basement swag - A man can&apos;t have enough basement swag
          </p>
        </header>

        {/* ============== Product / Main ==============  */}

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

        {/* ============== Cart ============== */}

        <div
          className={`fixed w-full lg:w-fit flex items-center max-h-screen justify-between flex-col bg-black lg:border lg:border-white top-0 right-0 z-20 ${
            showCart ? "flex" : "hidden"
          }`}
        >
          <Cart cartState={[cart, setCart]} closeCart={closeCart} />
        </div>

        {/* ============== Footer ==============  */}

        <footer className="relative w-full h-footer">
          <Image alt="A footer" layout="fill" src="/footer.svg" />
        </footer>
      </div>

      {/* ============== Overlay for cart ============== */}

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
