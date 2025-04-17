import ProductStickyBar from "@/components/Product/ProductStickyBar";

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
