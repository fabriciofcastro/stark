import { forwardRef, type SelectHTMLAttributes, useId } from "react";

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

type Option = { value: string; label: string };

type AccessibleSelectProps = {
  label?: string;
  floating?: boolean;
  options: Option[];
  error?: string | boolean;
  description?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, AccessibleSelectProps>(
  (
    {
      id,
      label,
      floating = false,
      options,
      error,
      description,
      className,
      size = "md",
      required,
      value,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const selectId = id ?? `select-${autoId}`;
    const descId = description ? `${selectId}-desc` : undefined;
    const errorId = error ? `${selectId}-error` : undefined;

    const sizes = {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-3",
      lg: "px-4 py-3 text-lg",
    } as const;

    const sizeClass = sizes[size as keyof typeof sizes] || sizes.md;

    const baseClasses = cx(
      "w-full appearance-none bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold-500))] focus:border-transparent",
      sizeClass,
      error ? "border-red-500 focus:ring-red-500" : "",
      className,
    );

    if (floating && label) {
      return (
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            required={required}
            aria-describedby={
              [descId, errorId].filter(Boolean).join(" ") || undefined
            }
            aria-invalid={!!error}
            className={baseClasses}
            value={value}
            {...props}
          >
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-slate-800"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <label
            htmlFor={selectId}
            className="pointer-events-none absolute left-3 -top-2 bg-[hsl(var(--brand-green-800))] px-1 text-xs text-gray-200"
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
            htmlFor={selectId}
            className="mb-2 block font-medium text-gray-200 text-sm"
          >
            {label} {required && <span className="text-red-400">*</span>}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          required={required}
          aria-describedby={
            [descId, errorId].filter(Boolean).join(" ") || undefined
          }
          aria-invalid={!!error}
          className={baseClasses}
          value={value}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-800">
              {opt.label}
            </option>
          ))}
        </select>

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

Select.displayName = "Select";

export default Select;
export { Select };
