import ProductListSection from "@/components/products/ProductListSection";
import { getRootCategory } from "@/lib/api/categories";

interface Props {
  params: Promise<{
    tab: string;
    sub: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const tabs = await getRootCategory();
  const tab = (await params).tab;
  const tabName = tabs?.find((t) => t.key === tab)?.name ?? "전체";
  return {
    title: `제품 - ${tabName}`,
    description: `${tabName} 제품을 확인해보세요.`
  };
}

export default async function Products({ params }: Props) {
  return (
    <ProductListSection
      currentTab={(await params).tab}
      currentSubTab={(await params).sub}
    />
  );
}
