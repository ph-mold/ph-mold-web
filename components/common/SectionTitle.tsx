import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return <p className="text-center text-4xl font-semibold">{children}</p>;
}
