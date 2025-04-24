import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import clsx from "clsx";

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

type Size = "small" | "medium" | "large";
type Variant = "outlined" | "filled" | "standard";

interface InputProps extends NativeInputProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
  inputClassName?: string;
  size?: Size;
  variant?: Variant;
}

const sizeStyles: Record<Size, string> = {
  small: "text-sm px-2 py-1",
  medium: "text-base px-3 py-2",
  large: "text-lg px-4 py-3"
};

const variantStyles: Record<Variant, string> = {
  outlined: "border border-background2 bg-reverseForground",
  filled: "bg-background2 border border-transparent",
  standard: "border-b border-background2 bg-transparent"
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required = false,
      helperText,
      error = false,
      startIcon,
      endIcon,
      fullWidth = false,
      size = "medium",
      variant = "filled",
      className,
      inputClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={clsx(
          "min-x-0 flex flex-col gap-1",
          fullWidth && "w-full",
          className
        )}
      >
        {label && (
          <label
            className={clsx(
              "ml-1 flex items-center gap-1 text-sm font-medium",
              error ? "text-error" : "text-foreground2"
            )}
          >
            {label}
            {required && <span className="text-error">*</span>}
          </label>
        )}

        <div
          className={clsx(
            "flex items-center rounded-md transition-all",
            sizeStyles[size],
            variantStyles[variant],
            error
              ? "border-error text-error focus-within:border-error !bg-error/10"
              : "focus-within:border-signature",
            fullWidth && "w-full"
          )}
        >
          {startIcon && (
            <div
              className={clsx(
                "mr-2",
                error ? "text-error" : "text-foreground2"
              )}
            >
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            required={required}
            readOnly={
              rest.readOnly ??
              (rest.value !== undefined && rest.onChange === undefined)
            }
            className={clsx(
              "placeholder-foreground2 flex-1 border-none bg-transparent outline-none",
              inputClassName
            )}
            {...rest}
          />

          {endIcon && (
            <div
              className={clsx(
                "ml-2",
                error ? "text-error" : "text-foreground2"
              )}
            >
              {endIcon}
            </div>
          )}
        </div>

        {helperText && (
          <p
            className={clsx(
              "ml-1 text-xs",
              error ? "text-error" : "text-foreground2"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
