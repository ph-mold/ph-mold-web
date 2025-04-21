"use client";

import {
  GET_PRODUCTS_BY_CATEGORY,
  getProductsByCategory
} from "@/lib/api/products";
import { imageLoader } from "@/lib/imageLoader";
import { IGetProduct } from "@/types/api/product";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import useSWR from "swr";
import ProductGridSkeleton from "./ProductGrid.skeleton";
import WithSkeleton from "../common/WithSkeleton";

interface Props {
  categoryKey: string;
}

export default function ProductGrid({ categoryKey }: Props) {
  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError
  } = useSWR<IGetProduct[]>([GET_PRODUCTS_BY_CATEGORY, categoryKey], () =>
    getProductsByCategory(categoryKey)
  );

  if (productsError) {
    notFound();
  }

  return (
    <WithSkeleton
      isLoading={isProductsLoading}
      skeleton={<ProductGridSkeleton />}
    >
      <div className="grid grid-cols-2 gap-3 space-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products?.map((item, idx) => (
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
                  <div className="relative size-full">
                    <Image
                      loader={imageLoader}
                      src={item.thumbnailImageUrl}
                      alt={item.name}
                      fill
                      loading={idx < 5 ? "eager" : "lazy"}
                    />
                  </div>
                ) : (
                  <ImageOff className="stroke-signature size-[30%] stroke-[1.5] object-contain opacity-30" />
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
    </WithSkeleton>
  );
}
