"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { EscButton } from "./esc-button";
import { usePageData } from "@/hooks/use-page-data";
import { createCategory } from "../../../../lib/utils/create-category";
import { Link } from "@/components/ui/link";
import { useEffect, useRef, useState } from "react";
import { removeAccentsAndSpecialChars } from "@/lib/utils/remove-accents-and-special-chars";
import { useIsMobile } from "@/hooks/use-mobile";

let initialCategories: CategoryNavigationData[] = [];

export function Search() {
  const [categories, setCategories] = useState(initialCategories);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    usePageData().then(({ pageDataList }) => {
      initialCategories = pageDataList.map(createCategory);
      setCategories(initialCategories);
    });
  }, []);

  useEffect(() => {
    if (inputValue === "") {
      setCategories(initialCategories);
      return;
    }
    const searchValue = removeAccentsAndSpecialChars(inputValue);
    const filteredCategories: CategoryNavigationData[] = [];
    for (const category of initialCategories) {
      const filteredProducts: ProductNavigationData[] = [];
      for (const product of category.products) {
        const productName = removeAccentsAndSpecialChars(product.name);
        if (productName.includes(searchValue)) {
          filteredProducts.push(product);
        }
      }
      if (filteredProducts.length > 0) {
        filteredCategories.push({
          title: category.title,
          pathname: category.pathname,
          products: filteredProducts,
        });
      }
    }
    setCategories(filteredCategories);
  }, [inputValue, initialCategories]);

  const closeRef = useRef<HTMLButtonElement>(null);
  function onClose() {
    closeRef.current?.click();
  }

  const isMobile = useIsMobile();

  return (
    <Dialog>
      {isMobile ? (
        <DialogTrigger className="h-10 w-10 flex justify-center items-center">
          <SearchIcon size={23} />
        </DialogTrigger>
      ) : (
        <DialogTrigger className="w-fit justify-self-center">
          <div className="bg-gray-100 w rounded-lg h-10 w-80 flex items-center px-3 gap-3 cursor-pointer">
            <SearchIcon size={20} />
            <input
              disabled
              placeholder="Pesquisar"
              className="pointer-events-none"
            />
          </div>
        </DialogTrigger>
      )}
      <DialogContent className="overflow-hidden p-0 gap-0 md:max-h-[calc(100vh-7rem)]">
        <DialogHeader>
          <DialogTitle className="hidden">Pesquisar</DialogTitle>
          <div className="h-14 flex items-center px-4">
            <SearchIcon />
            <Input
              className="h-14 focus:outline-0 text-base px-4"
              placeholder="Pesquisar"
              value={inputValue}
              onInput={(e) => {
                setInputValue(e.currentTarget.value);
              }}
            />
            <DialogClose className="hidden" ref={closeRef} />
            <EscButton onClick={onClose} />
          </div>
        </DialogHeader>
        <div className="overflow-auto max-h-[calc(100vh-3.5rem)] md:max-h-[calc(100vh-10.5rem)]">
          <ul className="pb-4">
            {categories.length === 0 ? (
              <p className="text-center text-gray-600 p-4 text-ellipsis overflow-hidden">
                Não foi possível encontrar nenhum resultado para “{inputValue}”
              </p>
            ) : (
              categories.map((category) => (
                <li key={category.pathname} className="mt-4">
                  <h2 className="text-lg font-semibold px-4 py-2">
                    {category.title}
                  </h2>
                  <ul>
                    {category.products.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={product.pathname}
                          className="block px-4 py-2 hover:bg-gray-100 flex flex-col"
                          onClick={onClose}
                        >
                          <p className="text-pretty">{product.name.trim()}</p>
                          <p className="text-gray-600 text-sm">
                            Modelo: {product.model || "Único"}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            )}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
