import { Typography } from "@/components/common/Typography";

export default function AboutLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:py-4">
      <div className="relative h-fit w-full">
        <Typography
          variant={"h1"}
          textAlign={"center"}
          className="hidden py-8 font-semibold md:block"
        >
          회사 소개
        </Typography>
        {children}
      </div>
    </div>
  );
}
