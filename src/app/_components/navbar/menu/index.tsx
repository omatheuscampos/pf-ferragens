"use client";

import { Link } from "@/components/ui/link";
import { LinkToHome } from "@/components/ui/link-to-home";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePageNavigationData } from "@/hooks/use-page-navigation-data";
import { Menu as MenuIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MenuButton } from "./button";

export function Menu() {
  const [pageNavigationData, setPageNavigationData] = useState<
    PageNavigationData[]
  >([]);
  useEffect(() => {
    usePageNavigationData().then(setPageNavigationData);
  }, []);
  const closeRef = useRef<HTMLButtonElement>(null);
  function onClose() {
    closeRef.current?.click();
  }
  return (
    <Sheet>
      <div className="flex items-center w-48">
        <SheetTrigger>
          <MenuButton />
        </SheetTrigger>
        <LinkToHome />
      </div>
      <SheetContent className="w-64 p-0" side="left">
        <header className="sticky top-0 h-14 px-4 flex flex-row items-center mb-1">
          <span className="sr-only">Close</span>
          <SheetClose ref={closeRef}>
            <MenuButton />
          </SheetClose>
          <SheetTitle className="hidden">Pj Ferragens</SheetTitle>
          <LinkToHome onClick={onClose} />
        </header>
        <div className="h-[calc(100vh-64px)] overflow-y-auto px-4 pb-4 flex flex-col">
          {pageNavigationData.map((page) => (
            <div
              className="flex flex-col border-b py-6 last:border-none"
              key={page.pathname}
            >
              <Link href={page.pathname} onClick={onClose}>
                <span className="font-bold mb-2 block hover:underline hover:text-blue-400">
                  {page.title}
                </span>
              </Link>
              <ul className="flex flex-col">
                {page.sections.map((section, i) => (
                  <li className="py-1 max-w-60" key={section.pathname + i}>
                    <Link
                      onClick={onClose}
                      href={section.pathname}
                      className="text-sm block text-balance hover:underline hover:text-blue-400 font-semibold text-gray-600"
                    >
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
