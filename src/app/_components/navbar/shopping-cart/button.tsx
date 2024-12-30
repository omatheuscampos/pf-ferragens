import { ShoppingCart } from "lucide-react";

interface ShoppingCartButtonProps {
  productsAmount?: number;
}

export function ShoppingCartButton(props: ShoppingCartButtonProps) {
  return (
    <div className="w-10 h-10 md:w-[84px] md:px-2 flex justify-center items-center gap-3 cursor-pointer">
      <ShoppingCart size={23} />
      <span className="hidden md:flex bg-primary text-sm text-white h-8 w-8 justify-center items-center rounded-lg">
        {props.productsAmount?.toString().padStart(2, "0")}
      </span>
    </div>
  );
}
