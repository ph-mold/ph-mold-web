"use client";

import { imageLoader } from "@/lib/imageLoader";
import { IGetProduct } from "@/types/api/product";
import { ImageOff } from "lucide-react";
import Image from "next/image";

interface Props {
  products?: IGetProduct[];
}

export default function ProductGrid({ products }: Props) {
  return (
    <div className="my-8 grid grid-cols-2 gap-3 space-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {products?.map((item) => (
        <div key={item.id} className="relative flex flex-col gap-2">
          <div className="text-foreground2 absolute top-[6px] left-2 text-xs font-semibold">
            {item.material}
          </div>
          <div className="bg-background2 flex aspect-square items-center justify-center overflow-hidden rounded-lg">
            {item.thumbnailImageUrl ? (
              <Image
                loader={imageLoader}
                src={item.thumbnailImageUrl}
                alt={item.name}
                width={240}
                height={240}
                className="h-full w-full object-contain"
              />
            ) : (
              <ImageOff className="stroke-signature/30 size-[30%] stroke-[1.5] object-contain" />
            )}
          </div>
          <div className="space-y-1">
            <p className="text-foreground2 text-xs">{item.code}</p>
            <p className="text-sm font-bold">{item.name}</p>
            <div className="flex flex-wrap space-y-1 space-x-1 py-1">
              {item.tags.map((tag) => (
                <p
                  key={tag.key}
                  className="bg-background2 text-signature h-6 rounded-md px-1 py-[1px] text-sm text-nowrap"
                >
                  {tag.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
