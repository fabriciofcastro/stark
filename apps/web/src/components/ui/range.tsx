import { forwardRef, type InputHTMLAttributes, useId } from "react";

type AccessibleRangeProps = {
  label?: string;
  suffix?: string;
  className?: string;
  valueLabelClassName?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const Range = forwardRef<HTMLInputElement, AccessibleRangeProps>(
  (
    { id, label, suffix, className, valueLabelClassName, value, ...props },
    ref,
  ) => {
    const autoId = useId();
    const rangeId = id ?? `range-${autoId}`;

    return (
      <div className={className}>
        {label && (
          <label htmlFor={rangeId} className="mb-1 block text-sm text-gray-200">
            {label}
          </label>
        )}
        <input
          id={rangeId}
          ref={ref}
          type="range"
          className="w-full accent-[hsl(var(--brand-gold-500))]"
          {...props}
        />
        <span className={`text-gray-400 text-sm ${valueLabelClassName ?? ""}`}>
          {String(value)} {suffix}
        </span>
      </div>
    );
  },
);

Range.displayName = "Range";

export default Range;
export { Range };
