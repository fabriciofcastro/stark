"use client";

import type { RefObject } from "react";

type MobileToggleProps = {
  isOpen: boolean;
  onToggle: () => void;
  controlsId?: string;
  buttonRef?: RefObject<HTMLButtonElement>;
};

const MobileToggle = ({
  isOpen,
  onToggle,
  controlsId = "primary-mobile-nav",
  buttonRef,
}: MobileToggleProps) => {
  return (
    <button
      className="lg:hidden text-white"
      onClick={onToggle}
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      type="button"
      ref={buttonRef}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        role="img"
        aria-labelledby="menu-title"
      >
        <title id="menu-title">{isOpen ? "Fechar menu" : "Abrir menu"}</title>
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
      <span className="sr-only">{isOpen ? "Fechar" : "Abrir"} menu</span>
    </button>
  );
};

export { MobileToggle };
