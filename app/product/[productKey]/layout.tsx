import ProductStickyBar from "@/components/product/ProductStickyBar";
import { StickyButtonProvider } from "@/context/StickyButtonContext";

export default async function ProductsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StickyButtonProvider>
        <ProductStickyBar />
        {children}
      </StickyButtonProvider>
    </>
  );
}
