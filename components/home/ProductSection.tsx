import SectionTitle from "../common/SectionTitle";
import ButtonWithArrow from "./ButtonWithArrow";
import { IProductCategory } from "@/types/product";
import ProductCategoryCard from "./ProductCategoryCard";

const productCategoryList: IProductCategory[] = [
  {
    name: "주사기",
    desc: "#투명시린지 #주사기 #앰플주사기 #주사기충진 #시린지충진 #의료기기",
    image: "/sample1.png",
  },
  {
    name: "앰플",
    desc: "#유리앰플 #고농축앰플 #앰플화장품 #메디컬앰플 #세럼앰플 #액상앰플 #투명앰플 #앰플플라스틱 #PET앰플 #PP앰플 ",
    image: "/sample1.png",
  },
  {
    name: "바이알",
    desc: "#바이알병 #바이알증착 #바이알_고무전 #바이알엠플 #바이알인쇄",
    image: "/sample1.png",
  },
  {
    name: "청결제주사기",
    desc: "#청결제시린지 #y존시린지 #세정주사기 #청결제 #여성용주사기 #질세정제 #와이존주사기 #세정제 #질청결제",
    image: "/sample1.png",
  },
];

export default function ProductCategorySection() {
  return (
    <section id="제품" className="h-fit py-20 flex flex-col gap-8">
      <SectionTitle>제품</SectionTitle>
      <div className="flex flex-col md:grid md:grid-cols-2 max-w-[1080px] mx-4 lg:mx-auto">
        {productCategoryList.map((product) => (
          <ProductCategoryCard key={product.name} {...product} />
        ))}
      </div>
      <ButtonWithArrow className="mx-auto mt-4">제품 전체보기</ButtonWithArrow>
    </section>
  );
}
