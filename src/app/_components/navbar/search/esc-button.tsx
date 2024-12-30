"use client";

import { useEffect } from "react";

interface EscButtonProps {
  onClick: () => void;
}

export function EscButton(props: EscButtonProps) {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Esc") {
      props.onClick();
    }
  }

  return (
    <>
      <button
        className="text-sm bg-gray-200 py-1 px-1.5 rounded-lg"
        aria-label="Cancel"
        onClick={props.onClick}
      >
        Esc
      </button>
    </>
  );
}
