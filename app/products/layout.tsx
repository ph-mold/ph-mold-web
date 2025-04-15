import { Typography } from "@/components/common/Typography";
import CategoryTabs from "@/components/products/CategoryTabs";
import { getRootCategory } from "@/lib/api/categories";

export default async function ProductsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = await getRootCategory();
  return (
    <div className="mt-16 md:py-4">
      <div className="relative h-fit w-full">
        <Typography
          variant={"h1"}
          textAlign={"center"}
          className="hidden py-8 font-semibold md:block"
        >
          제품
        </Typography>

        <CategoryTabs tabs={tabs} />
        {children}
      </div>
    </div>
  );
}
