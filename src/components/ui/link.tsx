"use client";

import NextLink from "next/link";
import { MouseEventHandler } from "react";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function Link(props: LinkProps) {
  return <NextLink {...props} onClick={props.onClick} />;
}
