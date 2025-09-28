import { forwardRef, type InputHTMLAttributes, useId } from "react";

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

type AccessibleInputProps = {
  label?: string;
  floating?: boolean;
  error?: string | boolean;
  description?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

const Input = forwardRef<HTMLInputElement, AccessibleInputProps>(
  (
    {
      id,
      label,
      floating = false,
      type = "text",
      required = false,
      error,
      description,
      size = "md",
      className,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = id ?? `input-${autoId}`;
    const descId = description ? `${inputId}-desc` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    const sizes = {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2",
      lg: "px-4 py-3 text-lg",
    } as const;

    const baseClasses = cx(
      "w-full bg-white/10 border border-white/20 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold-500))] focus:border-transparent",
      sizes[size],
      error ? "border-red-500 focus:ring-red-500" : "",
      floating ? "peer px-4 py-3" : "",
      className,
    );

    if (floating && label) {
      return (
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={type}
            required={required}
            aria-describedby={
              [descId, errorId].filter(Boolean).join(" ") || undefined
            }
            aria-invalid={!!error}
            placeholder=" "
            className={baseClasses}
            {...props}
          />
          <label
            htmlFor={inputId}
            className="pointer-events-none absolute left-3 top-2 text-sm text-gray-200 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gold peer-focus:px-1 peer-focus:bg-[hsl(var(--brand-green-800))] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-[hsl(var(--brand-green-800))]"
          >
            {label} {required && <span className="text-red-400">*</span>}
          </label>
          {description && !error && (
            <p id={descId} className="mt-1 text-gray-400 text-xs">
              {description}
            </p>
          )}
          {error && (
            <p id={errorId} role="alert" className="mt-1 text-red-500 text-xs">
              {typeof error === "string" ? error : "Valor inválido."}
            </p>
          )}
        </div>
      );
    }

    return (
      <>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block font-medium text-gray-200 text-sm"
          >
            {label} {required && <span className="text-red-400">*</span>}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          required={required}
          aria-describedby={
            [descId, errorId].filter(Boolean).join(" ") || undefined
          }
          aria-invalid={!!error}
          className={baseClasses}
          {...props}
        />

        {description && !error && (
          <p id={descId} className="mt-1 text-gray-400 text-xs">
            {description}
          </p>
        )}

        {error && (
          <p id={errorId} role="alert" className="mt-1 text-red-500 text-xs">
            {typeof error === "string" ? error : "Valor inválido."}
          </p>
        )}
      </>
    );
  },
);
Input.displayName = "Input";

export default Input;
export { Input };
