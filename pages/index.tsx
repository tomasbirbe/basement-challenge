import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Product } from "../product/types";
import api from "../services/api";

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);

  useEffect(() => {
    api.getProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  function addToCart(product: Product) {
    const cartItem: CartItem = {
      id: new Date().getTime() * Math.random() * 100,
      product,
      quantity: 1,
    };

    setCart([...cart, cartItem]);
  }

  function calculateTotal() {
    return cart.reduce((acc, cartItem) => cartItem.product.price + acc, 0);
  }

  return (
    <>
      <div className="w-full max-w-screen-2xl m-auto relative flex flex-col items-center justify-center pt-4 gap-12">
        <nav className="px-6 flex flex-row justify-between w-full py-4">
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
            CART (0)
          </button>
        </nav>
        <header className="px-6 w-full overflow-hidden flex flex-col gap-12 justiy-center items-center">
          <div className="relative w-full h-header">
            <Image alt="hola" layout="fill" src="/header.svg" />
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
          className={`absolute flex items-center justify-center flex-col bg-black border border-white top-0 right-0 z-20 ${
            showCart ? "flex" : "hidden"
          }`}
        >
          <div className="self-end pt-4 px-4">
            <button className="px-4 text-2xl" onClick={() => setShowCart(false)}>
              → CLOSE
            </button>
          </div>
          <div className="flex gap-6 px-8">
            <span className="text-cart-title">YOUR</span>
            <span className="text-cart-title hollow text-black">CART</span>
          </div>
          <div className="w-full px-8 pb-10 flex flex-col gap-8">
            {cart.map((cartItem) => (
              <div key={cartItem.id} className="py-4 px-6 border max-h-screen border-white w-full">
                <div className="bg-gradient-to-t w-fit from-starter-gradient to-ending-gradient">
                  <Image
                    alt="A preview of a product"
                    height={230}
                    src={cartItem.product.image}
                    width={210}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-between border-t px-6">
            <p className="text-4xl py-4 w-3/5 flex-2 border-r">TOTAL: ${calculateTotal()}</p>
            <button className="text-4xl py-4 hollow text-black">CHECKOUT</button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 z-10 w-full h-full bg-opacity-60 bg-black ${
          showCart ? "block" : "hidden"
        }`}
        onClick={() => setShowCart(false)}
      />
    </>
  );
};

export default Home;
