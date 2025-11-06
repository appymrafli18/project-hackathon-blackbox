import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50",
    secondary:
      "bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20",
    outline: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
  };

  return (
    <button
      className={`px-6 py-2.5 rounded-lg font-medium transition-all ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
