import React from "react";
import { Menu } from "lucide-react";

interface NavbarButtonProps {
  onClick?: () => void;
}

export function MenuButton({ onClick }: NavbarButtonProps) {
  return (
    <div
      className="h-10 w-10 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <Menu />
    </div>
  );
}
