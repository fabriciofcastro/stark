import { forwardRef, type TextareaHTMLAttributes, useId } from "react";

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

type AccessibleTextareaProps = {
  label?: string;
  floating?: boolean;
  error?: string | boolean;
  description?: string;
  showCounter?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  counterClassName?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, AccessibleTextareaProps>(
  (
    {
      id,
      label,
      floating = true,
      error,
      description,
      showCounter = false,
      maxLength,
      className,
      size = "md",
      counterClassName,
      required,
      value,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const textareaId = id ?? `textarea-${autoId}`;
    const descId = description ? `${textareaId}-desc` : undefined;
    const errorId = error ? `${textareaId}-error` : undefined;

    const sizes = {
      sm: "px-2 py-2 text-sm",
      md: "px-4 py-3",
      lg: "px-4 py-4 text-lg",
    } as const;

    const baseClasses = cx(
      "w-full bg-white/10 border border-white/20 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold-500))] focus:border-transparent",
      "peer",
      sizes[size],
      error ? "border-red-500 focus:ring-red-500" : "",
      className,
    );

    const labelEl =
      label && floating ? (
        <label
          htmlFor={textareaId}
          className="pointer-events-none absolute left-3 top-2 text-sm text-gray-200 transition-all duration-300 ease-in-out peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-brand-gold-400 peer-focus:px-2 peer-focus:py-1 peer-focus:bg-slate-800/90 peer-focus:backdrop-blur-sm peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:py-1 peer-[:not(:placeholder-shown)]:bg-slate-800/90 peer-[:not(:placeholder-shown)]:backdrop-blur-sm"
        >
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      ) : label ? (
        <label
          htmlFor={textareaId}
          className="mb-2 block font-medium text-gray-200 text-sm"
        >
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      ) : null;

    const currentLength =
      typeof value === "string" || typeof value === "number"
        ? String(value).length
        : 0;

    return (
      <div className={floating ? "relative" : undefined}>
        {floating ? null : labelEl}
        <textarea
          id={textareaId}
          ref={ref}
          required={required}
          aria-describedby={
            [descId, errorId].filter(Boolean).join(" ") || undefined
          }
          aria-invalid={!!error}
          placeholder={floating ? " " : props.placeholder}
          maxLength={maxLength}
          className={baseClasses}
          value={value}
          {...props}
        />
        {floating ? labelEl : null}

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
        {showCounter && (
          <div
            className={cx(
              "mt-1 flex items-center justify-end text-xs text-gray-400",
              counterClassName,
            )}
            aria-live="polite"
          >
            {currentLength}
            {maxLength ? `/${maxLength}` : ""}
          </div>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
export { Textarea };
