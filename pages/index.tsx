import type {NextPage} from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="px-4 w-full">
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
        <div className="block w-full">
          <Image alt="hola" height={365} layout="responsive" src="/header.svg" width={1376} />
        </div>
        <p className="w-overflow overflow-hidden py-2 border-b border-t whitespace-nowrap text-4xl">
          A man can&apos;t have enough basement swag - A man can&apos;t have enough basement swag
        </p>
      </header>
    </div>
  );
};

export default Home;
