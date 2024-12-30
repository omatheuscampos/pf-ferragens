"use client";

import { cn } from "@/lib/utils/tailwind-class-merge";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function ProductSection({
  children,
  className,
  id,
}: ProductSectionProps) {
  return (
    <div className={cn("flex flex-col gap-4 scroll-mt-24", className)} id={id}>
      {children}
    </div>
  );
}

interface ProductSectionTitleProps {
  children: string;
  className?: string;
}

export function ProductSectionTitle({
  children,
  className,
}: ProductSectionTitleProps) {
  return (
    <h2
      className={cn("text-xl md:text-2xl font-bold ml-4 md:ml-16", className)}
    >
      {children}
    </h2>
  );
}

interface ProductSectionContentProps {
  className?: string;
  children: React.ReactElement[];
}

export function ProductSectionContent({
  children,
  className,
}: ProductSectionContentProps) {
  return (
    <Carousel
      className="w-full"
      opts={{
        dragFree: true,
        containScroll: "keepSnaps",
        align: (viewSize, _, index) => {
          const slideWidth = 304; // Largura fixa do slide
          const offset = index * slideWidth; // Cálculo do deslocamento
          return offset / viewSize; // Retorna o alinhamento proporcional ao tamanho da viewport
        },
      }}
    >
      <CarouselContent
        className={cn(
          "cursor-grab active:cursor-grabbing ml-0 mr-6 md:ml-12 md:mr-16",
          className
        )}
      >
        {children.map((item) => (
          <CarouselItem
            key={item.key}
            children={item}
            className="basis-auto select-none"
          />
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" variant="secondary" />
      <CarouselNext className="hidden md:flex" variant="secondary" />
    </Carousel>
  );
}
