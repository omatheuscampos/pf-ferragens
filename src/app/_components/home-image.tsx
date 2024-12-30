"use client";

import { Image } from "@/components/ui/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface HomeImageProps {
  src: string;
  alt: string;
}

export function SectionImage(props: HomeImageProps) {
  return (
    <Image
      className="min-w-full max-w-[calc(100vw - 32px)] md:max-w-[400px]"
      src={props.src}
      alt={props.alt}
      width={360}
      ratio={16 / 9}
    />
  );
}

export function LogoImage() {
  const isMobile = useIsMobile();
  return (
    <Image
      alt="Ferragens"
      src="/icon.png"
      className="drop-shadow-lg"
      width={isMobile ? 80 : 160}
      ratio={1}
    />
  );
}
