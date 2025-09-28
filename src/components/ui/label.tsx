import type React from "react";

// Utilitário para juntar classes
const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
};

const Label = ({ htmlFor, children, required, className }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cx("mb-2 block font-medium text-gray-200 text-sm", className)}
    >
      {children} {required && <span className="text-red-400">*</span>}
    </label>
  );
};

export default Label;
