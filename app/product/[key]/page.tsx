import ProductDetailSection from "@/components/product/ProductDetailSection";
import { getProductSummaryByKey } from "@/lib/api/products";

interface Props {
  params: Promise<{ key: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { key } = await params;
  const summary = await getProductSummaryByKey(key);
  const originalImageUrl = `${process.env.NEXT_PUBLIC_FILE_SERVER_BASE_URL}${summary.thumbnailImageUrl}`;
  return {
    title: summary.name,
    description: `${summary.name} 제품의 상세 정보`,
    openGraph: {
      title: summary.name,
      description: `${summary.name} 제품을 확인해보세요.`,
      images: [
        {
          url: originalImageUrl,
          width: 400,
          height: 400,
          alt: `${summary.name} 썸네일`
        }
      ]
    }
  };
}

export default async function Product({ params }: Props) {
  const { key } = await params;
  return <ProductDetailSection productKey={key} />;
}
