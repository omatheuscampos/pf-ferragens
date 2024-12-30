import { Menu } from "./menu";
import { Search } from "./search";
import { ShoppingCart } from "./shopping-cart";

export function Navbar() {
  return (
    <div className="h-14 px-4 bg-background items-center grid grid-cols-[1fr_40px_40px] gap-2 md:grid-cols-[192px_1fr_192px] sticky top-0 inset-x-0 z-10">
      <Menu />
      <Search />
      <ShoppingCart />
    </div>
  );
}
