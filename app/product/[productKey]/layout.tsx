import ProductStickyBar from "@/components/product/ProductStickyBar";

export default async function ProductsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProductStickyBar />
      {children}
    </>
  );
}
