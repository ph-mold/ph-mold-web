import { imageLoader } from "@/lib/imageLoader";
import { IProductCategory } from "@/types/api/product";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProductCategoryCardProps = IProductCategory;

export default function ProductCategoryCard({
  name,
  desc,
  image,
  link
}: ProductCategoryCardProps) {
  return (
    <Link href={link}>
      <div className="group relative flex cursor-pointer flex-col items-center gap-6 p-6 sm:flex-row md:max-h-[208px]">
        <div className="absolute top-0 left-0 z-1 size-full overflow-x-hidden rounded-lg bg-black/5 opacity-0 transition-all duration-100 group-hover:opacity-100">
          <ArrowRight className="strock-foreground2 absolute top-10 left-full size-5 transform opacity-0 transition-all duration-100 group-hover:-translate-x-10 group-hover:opacity-100" />
        </div>
        <div className="bg-background2 w-full flex-none rounded-lg sm:size-40">
          <Image
            loader={imageLoader}
            src={image}
            alt={name}
            width={240}
            height={240}
            className="mx-auto transition-all duration-200 group-hover:scale-110"
          />
        </div>
        <div className="flex h-full flex-auto flex-col justify-center gap-2">
          <p className="flex-none text-xl font-semibold">{name}</p>
          <p className="text-foreground2 flex-initial overflow-y-hidden">
            {desc}
          </p>
        </div>
      </div>
    </Link>
  );
}
