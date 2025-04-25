import { TextareaHTMLAttributes, forwardRef, useMemo } from "react";
import clsx from "clsx";

type NativeTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
>;

type Size = "small" | "medium" | "large";
type Variant = "outlined" | "filled" | "standard";

interface TextAreaProps extends NativeTextAreaProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
  className?: string;
  inputClassName?: string;
  size?: Size;
  variant?: Variant;
  showCount?: boolean;
  value?: string;
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

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      required = false,
      helperText,
      error = false,
      fullWidth = false,
      size = "medium",
      variant = "filled",
      className,
      inputClassName,
      showCount = true,
      maxLength,
      value,
      defaultValue,
      ...rest
    },
    ref
  ) => {
    const currentLength = useMemo(() => {
      if (typeof value === "string") return value.length;
      if (typeof defaultValue === "string") return defaultValue.length;
      return 0;
    }, [value, defaultValue]);

    return (
      <div
        className={clsx(
          "flex min-w-0 flex-col gap-1",
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

        <textarea
          ref={ref}
          required={required}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          className={clsx(
            "placeholder-foreground2 resize-none rounded-md border transition-all outline-none",
            sizeStyles[size],
            variantStyles[variant],
            error
              ? "border-error bg-error/10 text-error focus:border-error"
              : "focus:border-signature text-foreground",
            inputClassName,
            fullWidth && "w-full"
          )}
          {...rest}
        />

        <div className="text-foreground2 flex justify-between text-xs">
          {helperText && (
            <span className={clsx(error && "text-error")}>{helperText}</span>
          )}
          {showCount && maxLength && (
            <span className={clsx(error && "text-error")}>
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
