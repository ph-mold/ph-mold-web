import ProductListSection from "@/components/products/ProductListSection";
import { getCategoryByParentKey, getRootCategory } from "@/lib/api/categories";

interface Props {
  params: Promise<{
    tab: string;
    sub: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { tab, sub } = await params;
  const tabs = await getRootCategory();
  const subTabs = await getCategoryByParentKey(tab);
  const tabName =
    subTabs?.find((t) => t.key === sub)?.name ??
    tabs?.find((t) => t.key === tab)?.name ??
    "전체";
  return {
    title: `${tabName}`,
    description: `${tabName} 제품을 확인해보세요.`
  };
}

export default async function Products({ params }: Props) {
  const { tab, sub } = await params;
  return <ProductListSection currentTab={tab} currentSubTab={sub} />;
}
