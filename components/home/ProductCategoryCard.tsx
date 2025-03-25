import { IProductCategory } from "@/types/product";
import { RightArrowIcon } from "@/utils/svgr";
import Image from "next/image";

type ProductCategoryCardProps = IProductCategory;

export default function ProductCategoryCard({
  name,
  desc,
  image,
}: ProductCategoryCardProps) {
  return (
    <div className="relative flex flex-col sm:flex-row gap-6 p-6 items-center group cursor-pointer md:max-h-[208px]">
      <div className="absolute size-full z-[-1] bg-black/10 top-0 left-0 transition-all duration-100 group-hover:opacity-100 group-hover:z-1 opacity-0 rounded-lg">
        <RightArrowIcon className="fill-foreground2 absolute size-5 left-full top-10 transform -translate-y-1/2 transition-all duration-100 ease-in-out group-hover:opacity-100 group-hover:-translate-x-10 opacity-0" />
      </div>
      <div className="w-full sm:size-40 bg-background2 rounded-lg flex-none">
        <Image
          src={image}
          alt={name}
          width={240}
          height={240}
          className="transition-all duration-200 group-hover:scale-110 mx-auto"
        />
      </div>
      <div className="flex flex-col gap-2 justify-center flex-auto h-full">
        <p className="text-xl font-semibold flex-none">{name}</p>
        <p className="text-foreground2 flex-initial overflow-y-hidden">
          {desc}
        </p>
      </div>
    </div>
  );
}
