"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils/tailwind-class-merge";
import { useShoppingCart } from "@/context/shopping-cart";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addProduct } = useShoppingCart();
  return (
    <Card className={cn("w-64 md:w-72 h-full flex flex-col", className)}>
      <CardHeader className="p-5">
        <Image
          src={product.image}
          alt={product.name}
          width={288}
          ratio={11.125 / 16}
        />
      </CardHeader>
      <CardContent className="p-0 px-5 grow flex flex-col">
        <CardTitle className="mb-3 grow flex flex-col justify-center">
          <h3 className="text-center text-lg font-semibold text-pretty line-height-[1.675rem]">
            {product.name}
          </h3>
        </CardTitle>
        <div className="flex justify-between mb-2 h-6">
          <p className="text-sm text-gray-600">Modelo:</p>
          <p className="font-semibold">{product.model || "Único"}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-sm text-gray-600">Referência:</p>
          <p className="font-semibold">{product.id}</p>
        </div>
        <CardDescription className="text-center">
          {product.description || "Unidade"}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-5">
        <Button
          className="w-full text-xs uppercase font-semibold md:text-sm"
          onClick={() =>
            addProduct({
              ...product,
              amount: 0,
            })
          }
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar ao carrinho
        </Button>
      </CardFooter>
    </Card>
  );
}
