import ProductStickyBar from "@/components/product/ProductStickyBar";
import { StickyButtonProvider } from "@/context/StickyButtonContext";
import { getProductSummaryByKey } from "@/lib/api/products";

export default async function ProductsLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ productKey: string }>;
}>) {
  const { productKey } = await params;
  const summary = await getProductSummaryByKey(productKey);
  return (
    <>
      <StickyButtonProvider>
        <ProductStickyBar summary={summary} />
        {children}
      </StickyButtonProvider>
    </>
  );
}
