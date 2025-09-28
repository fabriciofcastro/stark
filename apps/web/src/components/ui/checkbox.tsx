import { forwardRef, type InputHTMLAttributes, useId } from "react";

type AccessibleCheckboxProps = {
  label: string;
  description?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const Checkbox = forwardRef<HTMLInputElement, AccessibleCheckboxProps>(
  ({ id, label, description, className, ...props }, ref) => {
    const autoId = useId();
    const checkboxId = id ?? `checkbox-${autoId}`;
    const descId = description ? `${checkboxId}-desc` : undefined;

    return (
      <label
        htmlFor={checkboxId}
        className={`flex items-center gap-3 text-sm text-gray-200 ${className ?? ""}`}
      >
        <input
          id={checkboxId}
          ref={ref}
          type="checkbox"
          aria-describedby={descId}
          className="h-5 w-5 rounded border-white/30 bg-white/5 text-[hsl(var(--brand-gold-500))] focus:ring-[hsl(var(--brand-gold-500))]"
          {...props}
        />
        <span className="leading-tight">
          {label}
          {description && (
            <span id={descId} className="block text-xs text-gray-400">
              {description}
            </span>
          )}
        </span>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
export { Checkbox };
