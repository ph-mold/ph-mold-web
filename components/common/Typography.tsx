import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const typographyVariants = cva("block", {
  variants: {
    variant: {
      h1: "text-4xl font-extrabold",
      h2: "text-3xl font-bold",
      h3: "text-2xl font-semibold",
      h4: "text-lg font-semibold",
      body: "text-base",
      caption: "text-sm",
      small: "text-xs"
    },
    textColor: {
      default: "text-foreground",
      inverse: "text-inverseForground",
      primary: "text-thTxt",
      danger: "text-fall",
      success: "text-signature"
    },
    textAlign: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify"
    },
    margin: {
      true: "mb-6",
      false: ""
    }
  },
  defaultVariants: {
    variant: "body",
    textColor: "default",
    textAlign: "left",
    margin: true
  }
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant,
      textColor,
      textAlign,
      margin,
      as: Comp = "div",
      ...props
    },
    ref
  ) => {
    return (
      <Comp
        ref={ref}
        className={clsx(
          typographyVariants({ variant, textColor, textAlign, margin }),
          className
        )}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { Typography };
