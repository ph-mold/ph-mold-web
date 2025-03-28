import clsx from "clsx";
import { ReactNode } from "react";

interface SectionTitleProps {
  className?: string;
  children: ReactNode;
}

export default function SectionTitle({
  children,
  className
}: SectionTitleProps) {
  return (
    <p className={clsx("text-center text-4xl font-semibold", className)}>
      {children}
    </p>
  );
}
