import * as React from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils/tailwind-class-merge";

interface ImageProps extends React.ComponentProps<"image"> {
  src: string;
  alt: string;
  width: number;
  ratio: number;
  className?: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ ratio, ...props }, ref) => {
    return (
      <NextImage
        alt={props.alt}
        src={props.src}
        width={props.width}
        height={props.width * ratio}
        className={cn("width-auto h-auto", props.className)}
        ref={ref}
      />
    );
  }
);
Image.displayName = "Image";

export { Image };
