import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function Button({
  children,
  className = "",
  disabled = false,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded px-4 py-2 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
