import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "info";
  className?: string;
}

export const Badge = ({
  children,
  variant = "default",
  className = "",
}: BadgeProps) => {
  const variantClasses = {
    default: "bg-purple-500/20 text-purple-300",
    success: "bg-green-500/20 text-green-300",
    warning: "bg-yellow-500/20 text-yellow-300",
    info: "bg-blue-500/20 text-blue-300",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
