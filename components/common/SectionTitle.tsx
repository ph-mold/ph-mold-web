import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return <p className="text-4xl font-semibold text-center">{children}</p>;
}
