import Image from "next/image";

interface Props {
  openCart: () => void;
  totalItems: number;
}

export default function Nav({ openCart, totalItems }: Props) {
  return (
    <nav className="px-6 flex flex-row justify-between w-full py-4 sticky top-0 z-10 bg-black">
      <div className="hidden md:flex md:items-center">
        <Image alt="Basement's logo" height={28} src="/logo.svg" width={192} />
      </div>
      <div className="md:hidden flex items-center">
        <Image alt="Basement's logo" height={30} src="/sm-logo.svg" width={30} />
      </div>
      <div className="hidden md:flex md:flex-row md:gap-x-4">
        <Image alt="Icon for decoration" height={22} src="/icons/navbar-icon-1.svg" width={22} />
        <Image alt="Icon for decoration" height={24} src="/icons/navbar-icon-2.svg" width={42} />
        <Image alt="Icon for decoration" height={20} src="/icons/navbar-icon-3.svg" width={82} />
        <Image alt="Icon for decoration" height={24} src="/icons/navbar-icon-4.svg" width={42} />
        <Image alt="Icon for decoration" height={21} src="/icons/navbar-icon-5.svg" width={24} />
      </div>
      <button
        className="font-bold font-grotesque text-lg rounded-3xl border-white border-2 px-4 py-2"
        onClick={openCart}
      >
        CART ( {totalItems} )
      </button>
    </nav>
  );
}
