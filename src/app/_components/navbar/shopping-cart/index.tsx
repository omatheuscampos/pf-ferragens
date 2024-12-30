"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ShoppingCartButton } from "./button";
import { useShoppingCart } from "@/context/shopping-cart";
import { Image } from "@/components/ui/image";
import { Minus, Plus, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { useRouter } from "next/navigation";

interface NumberInputProps {
  initialAmount?: number;
  onAmountChange?: (amount: number) => void;
}

function NumberInput(props: NumberInputProps) {
  const [amount, setAmount] = useState(props.initialAmount || 0);

  useEffect(() => {
    props.onAmountChange?.(amount);
  }, [amount]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let amount = Number.parseInt(e.target.value);
    if (Number.isNaN(amount)) return;
    if (amount < 1) amount = 1;
    if (amount > 999) amount = 999;
    setAmount(amount);
  }

  function add() {
    if (amount === 999) return;
    setAmount((prev) => prev + 1);
  }

  function subtract() {
    if (amount === 1) return;
    setAmount((prev) => prev - 1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key.match(/[0-9]/)) return;

    const validActions = new Map([
      ["ArrowDown", subtract],
      ["ArrowLeft", null],
      ["ArrowRight", null],
      ["Enter", null],
      [
        "ArrowUp",
        () => {
          e.preventDefault();
          add();
        },
      ],
      [
        "Backspace",
        () => {
          if (e.currentTarget.value.length === 1) {
            setAmount(0);
          }
        },
      ],
    ]);

    if (!validActions.has(e.key)) {
      e.preventDefault();
    }

    const action = validActions.get(e.key);
    if (action) action();
  }

  return (
    <div className="h-full w-[92px] w-fit flex justify-center items-center font-semibold rounded-lg overflow-hidden">
      <button className="h-9 p-1 border hover:bg-gray-100" onClick={subtract}>
        <Minus size={16} />
      </button>
      <input
        value={amount === 0 ? "" : amount}
        className="w-10 h-9 p-1 text-center border-y"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (amount === 0) setAmount(1);
        }}
      />
      <button className="h-9 p-1 border hover:bg-gray-100" onClick={add}>
        <Plus size={16} />
      </button>
    </div>
  );
}

let prevAmount = 0;
export function ShoppingCart() {
  const { products, updateProductAmount, removeProduct } = useShoppingCart();
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (products.length > prevAmount) {
      onOpen();
      setTimeout(focusOnFirstInput, 100);
    }
    if (products.length === 0) {
      onClose();
    }
    prevAmount = products.length;
  }, [products]);

  function focusOnFirstInput() {
    const ul = document.getElementById("shopping-cart-list");
    if (!ul) return;
    const firstLi = ul.firstChild as HTMLLIElement;
    if (!firstLi) return;
    const firstInput = firstLi.getElementsByTagName("input")[0];
    firstInput.focus();
  }

  function onOpen() {
    openRef.current?.click();
  }

  function onClose() {
    closeRef.current?.click();
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (products.length > 0) {
      router.push("/orcamento");
    }
    onClose();
  }

  const isButtonDisabled = products.length === 0;
  return (
    <Sheet>
      <SheetTrigger className="justify-self-end" ref={openRef}>
        <ShoppingCartButton productsAmount={products.length} />
      </SheetTrigger>
      <SheetContent className="w-[216px] p-0">
        <SheetHeader className="p-6 flex flex-col items-center gap-1">
          <SheetTitle className="hidden">Carrinho de compras</SheetTitle>
          <p className="text-sm text-gray-600">Solicite já seu orçamento!</p>
          <SheetClose className="hidden" ref={closeRef} />
          <Button
            onClick={(e) => {
              if (isButtonDisabled) return;
              handleClick(e);
            }}
            className={`w-full bg-primary text-white font-semibold uppercase text-sm ${
              isButtonDisabled && "hover:cursor-not-allowed opacity-50"
            }`}
          >
            Fechar pedido
          </Button>
        </SheetHeader>
        <div className="flex flex-col p-6 overflow-y-auto max-h-[calc(100vh-128px)]">
          <ul className="flex flex-col gap-9" id="shopping-cart-list">
            {products.map((product) => (
              <li key={product.id} className="flex flex-col gap-2">
                <div className="relative">
                  <Badge
                    className="absolute bg-primary text-white -top-2 -right-1 py-1 px-1.5 hover:bg-primary"
                    variant="destructive"
                  >
                    {product.id}
                  </Badge>
                  <Image
                    alt={product.name}
                    src={product.image}
                    ratio={11.125 / 16}
                    width={148}
                  />
                </div>
                <div className="flex justify-between items-end gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm  text-gray-600">Quantidade</span>
                    <NumberInput
                      initialAmount={product.amount}
                      onAmountChange={(amount) => {
                        updateProductAmount(product.id, amount);
                      }}
                    />
                  </div>
                  <button
                    className="h-9 w-9 border rounded-lg flex justify-center items-center hover:bg-red-100 hover:text-red-600"
                    onClick={() => removeProduct(product.id)}
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
