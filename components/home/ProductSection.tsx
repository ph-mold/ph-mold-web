import SectionTitle from "../common/SectionTitle";
import ButtonWithArrow from "./ButtonWithArrow";
import { IProductCategory } from "@/types/product";
import ProductCategoryCard from "./ProductCategoryCard";
import useSWR from "swr";
import { API } from "@/constants/api";

export default function ProductCategorySection() {
  const { data } = useSWR<IProductCategory[]>(API.PRODUCT_CATEGORIES.GET);

  return (
    <section id="제품" className="h-fit py-20 flex flex-col gap-8">
      <SectionTitle>제품</SectionTitle>
      <div className="flex flex-col md:grid md:grid-cols-2 max-w-[1080px] mx-4 lg:mx-auto">
        {data?.map((product) => (
          <ProductCategoryCard key={product.name} {...product} />
        ))}
      </div>
      <ButtonWithArrow className="mx-auto mt-4">제품 전체보기</ButtonWithArrow>
    </section>
  );
}
