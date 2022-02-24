import type {NextPage} from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="xl w-full">
      <div className="flex flex-row justify-between w-full px-5 py-4">
        <Image alt="Basement's logo" height={28} src="/logo.svg" width={192} />
        <div className="flex flex-row gap-x-4">
          <Image alt="hola" height={22} src="/icons/navbar-icon-5.svg" width={22} />
          <Image alt="hola" height={24} src="/icons/navbar-icon-2.svg" width={42} />
          <Image alt="hola" height={20} src="/icons/navbar-icon-4.svg" width={82} />
          <Image alt="hola" height={24} src="/icons/navbar-icon-3.svg" width={42} />
          <Image alt="hola" height={21} src="/icons/navbar-icon.svg" width={24} />
          {/* <Image />
          <Image />
          <Image />
          <Image /> */}
        </div>
        <button className="font-bold text-lg rounded-3xl border-white border-2 px-4 py-2">
          CART (0)
        </button>
      </div>
    </div>
  );
};

export default Home;
