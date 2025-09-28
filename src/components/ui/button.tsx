import type React from "react";
import { type ButtonHTMLAttributes, forwardRef } from "react";

// Helper simples para compor classes
const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

type ButtonProps = {
  children?: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "success";
  size?: "sm" | "md" | "lg";
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      variant = "primary",
      size = "md",
      leading,
      trailing,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg";

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    } as const;

    const variants = {
      primary:
        "bg-[hsl(var(--brand-gold-500))] text-black hover:bg-[hsl(var(--brand-gold-400))] focus-visible:ring-[hsl(var(--brand-gold-500))] focus-visible:ring-offset-[hsl(var(--brand-green-900))] shadow-soft",
      secondary:
        "bg-white/10 text-white border border-white/20 hover:bg-white/20 focus-visible:ring-[hsl(var(--brand-gold-500))] focus-visible:ring-offset-[hsl(var(--brand-green-900))]",
      outline:
        "border-2 border-[hsl(var(--brand-gold-500))] text-[hsl(var(--brand-gold-500))] hover:bg-[hsl(var(--brand-gold-500))]/10 focus-visible:ring-[hsl(var(--brand-gold-500))] focus-visible:ring-offset-[hsl(var(--brand-green-900))]",
      ghost:
        "bg-transparent text-white/90 hover:bg-white/10 focus-visible:ring-white/50",
      destructive:
        "bg-[hsl(var(--brand-red-500))] text-white hover:bg-[hsl(var(--brand-red-500))]/90 focus-visible:ring-[hsl(var(--brand-red-500))] focus-visible:ring-offset-[hsl(var(--brand-green-900))] shadow-soft",
      success:
        "bg-[hsl(var(--brand-green-500))] text-black hover:bg-[hsl(var(--brand-green-600))] focus-visible:ring-[hsl(var(--brand-green-500))] focus-visible:ring-offset-[hsl(var(--brand-green-900))] shadow-soft",
    } as const;

    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={cx(
          baseClasses,
          sizes[size],
          variants[variant],
          disabled ? "cursor-not-allowed opacity-60" : "",
          className,
        )}
        {...props}
      >
        {leading && <span className="flex items-center">{leading}</span>}
        {children}
        {trailing && <span className="flex items-center">{trailing}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
export { Button };
