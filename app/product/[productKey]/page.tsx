import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfoPanel from "@/components/product/ProductInfoPanel";

interface Props {
  params: Promise<{ productKey: string }>;
}

export default async function Product({ params }: Props) {
  const { productKey } = await params;
  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 md:px-10">
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 md:gap-12">
        <ProductImageGallery />
        <ProductInfoPanel />
      </div>
      <div className="h-[2000px]">{productKey}</div>
    </div>
  );
}
