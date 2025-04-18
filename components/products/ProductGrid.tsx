"use client";

import { imageLoader } from "@/lib/imageLoader";
import { IGetProduct } from "@/types/api/product";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  products?: IGetProduct[];
}

export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 space-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {products?.map((item) => (
        <Link key={item.id} href={`/product/${item.key}`}>
          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="relative flex flex-col gap-2 select-none"
          >
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
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
