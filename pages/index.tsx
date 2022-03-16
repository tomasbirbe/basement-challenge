import type {NextPage} from "next";
import Image from "next/image";
import {useEffect, useState} from "react";

import {Product} from "../product/types";
import api from "../services/api";

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    api.getProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <div className="px-4 w-full max-w-screen-2xl m-auto flex flex-col items-center justify-center pt-4 gap-12">
      <nav className="flex flex-row justify-between w-full py-4">
        <Image alt="Basement's logo" height={28} src="/logo.svg" width={192} />
        <div className="flex flex-row gap-x-4">
          <Image alt="Icon for decoration" height={22} src="/icons/navbar-icon-1.svg" width={22} />
          <Image alt="Icon for decoration" height={24} src="/icons/navbar-icon-2.svg" width={42} />
          <Image alt="Icon for decoration" height={20} src="/icons/navbar-icon-3.svg" width={82} />
          <Image alt="Icon for decoration" height={24} src="/icons/navbar-icon-4.svg" width={42} />
          <Image alt="Icon for decoration" height={21} src="/icons/navbar-icon-5.svg" width={24} />
        </div>
        <button className="font-bold font-grotesque text-lg rounded-3xl border-white border-2 px-4 py-2">
          CART (0)
        </button>
      </nav>
      <header className="w-full overflow-hidden flex flex-col gap-12 justiy-center items-center">
        <div className="relative w-full h-header">
          <Image alt="hola" layout="fill" src="/header.svg" />
        </div>
        <p className="w-overflow overflow-hidden py-2 border-b border-t whitespace-nowrap text-4xl">
          A man can&apos;t have enough basement swag - A man can&apos;t have enough basement swag
        </p>
      </header>

      <main className="flex gap-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-440 h-580 bg-gradient-to-t from-starter-gradient to-ending-gradient"
          >
            <button
              className="w-full h-full flex items-center justify-center relative border-b border-white"
              id="image-container"
            >
              <Image alt="A preview of a product" layout="fill" src={product.image} />
              <div className="w-1/2 h-1/2 relative">
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
    </div>
  );
};

export default Home;
