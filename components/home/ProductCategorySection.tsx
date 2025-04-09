import SectionTitle from "../common/SectionTitle";
import ButtonWithArrow from "./ButtonWithArrow";
import { IProductCategory } from "@/types/api/product";
import ProductCategoryCard from "./ProductCategoryCard";
import useSWR from "swr";
import { API } from "@/lib/constants/api";

export default function ProductCategorySection() {
  const { data } = useSWR<IProductCategory[]>(API.PRODUCT_CATEGORIES.GET);

  return (
    <section id="제품" className="flex h-fit flex-col gap-8 py-20">
      <SectionTitle>제품</SectionTitle>
      <div className="mx-4 flex max-w-[1080px] flex-col md:grid md:grid-cols-2 lg:mx-auto">
        {data?.map((product) => (
          <ProductCategoryCard key={product.name} {...product} />
        ))}
      </div>
      <ButtonWithArrow className="mx-auto mt-4">제품 전체보기</ButtonWithArrow>
    </section>
  );
}
