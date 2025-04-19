import { ReactNode, ElementType } from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

type Variant = "contained" | "outlined" | "text";
type Color = "primary" | "secondary" | "error";
type Size = "small" | "medium" | "large";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: Variant;
  color?: Color;
  size?: Size;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  as?: ElementType;
  href?: string;
}

const baseStyles =
  "flex cursor-pointer inline-flex items-center select-none justify-center gap-1 rounded-md duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles: Record<Variant, string> = {
  contained: "text-white",
  outlined: "border",
  text: "bg-transparent"
};

const sizeStyles: Record<Size, string> = {
  small: "text-sm font-base px-3 py-1.5",
  medium: "text-base font-medium px-4 py-2",
  large: "text-lg font-semibold px-5 py-3"
};

const colorStyles: Record<Color, Record<Variant, string>> = {
  primary: {
    contained: "bg-signature hover:bg-signature/80",
    outlined: "border-signature text-signature hover:bg-signature/10",
    text: "text-signature hover:bg-signature/10"
  },
  secondary: {
    contained: "bg-foreground hover:bg-foreground/80",
    outlined: "border-foreground text-foreground hover:bg-foreground/10",
    text: "text-foreground hover:bg-foreground/5"
  },
  error: {
    contained: "bg-error hover:bg-error/80",
    outlined: "border-error text-error hover:bg-error/10",
    text: "text-error hover:bg-error/10"
  }
};

export default function Button({
  children,
  onClick,
  className = "",
  variant = "contained",
  color = "primary",
  size = "medium",
  disabled = false,
  fullWidth = false,
  type = "button",
  startIcon,
  endIcon,
  loading = false,
  as: Component = "button",
  href
}: ButtonProps) {
  const classes = clsx(
    className,
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    colorStyles[color][variant],
    fullWidth && "w-full"
  );

  const content = (
    <>
      {loading ? <Loader2 className="size-4 animate-spin" /> : startIcon}
      <span className={clsx("size-full", loading && "opacity-0")}>
        {children}
      </span>
      {endIcon && !loading && endIcon}
    </>
  );

  if (Component === "button") {
    return (
      <motion.button
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        type={type}
        className={classes}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <Component
      href={href}
      className={classes}
      onClick={onClick}
      aria-disabled={disabled || loading}
    >
      {content}
    </Component>
  );
}
