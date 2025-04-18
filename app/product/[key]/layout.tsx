import ProductStickyBar from "@/components/product/ProductStickyBar";
import { StickyButtonProvider } from "@/context/StickyButtonContext";
import { getProductSummaryByKey } from "@/lib/api/products";

export default async function ProductsLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ key: string }>;
}>) {
  const { key } = await params;
  const summary = await getProductSummaryByKey(key);
  return (
    <>
      <StickyButtonProvider>
        <ProductStickyBar summary={summary} />
        {children}
      </StickyButtonProvider>
    </>
  );
}
