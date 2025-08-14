import ProductStickyBar from "@/components/product/ProductStickyBar";
import { StickyButtonProvider } from "@/context/StickyButtonContext";
import { getProductSummaryByKey } from "@/lib/api/products";
import { notFound } from "next/navigation";

export default async function ProductsLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ key: string }>;
}>) {
  const { key } = await params;
  let summary;

  try {
    summary = await getProductSummaryByKey(key);
    if (!summary) notFound();
  } catch {
    notFound();
  }

  return (
    <>
      <StickyButtonProvider>
        <ProductStickyBar summary={summary} />
        {children}
      </StickyButtonProvider>
    </>
  );
}
