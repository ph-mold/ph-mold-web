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
import { WithSkeleton } from "@ph-mold/ph-ui";

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
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products?.map((item, idx) => (
          <Link key={item.id} href={`/product/${item.key}`}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col gap-3"
            >
              {item.material && (
                <div className="bg-gradient-primary absolute top-2 left-2 z-5 rounded-md bg-gradient-to-r px-2 py-1 text-xs font-medium">
                  <span className="text-reverseForeground">
                    {item.material}
                  </span>
                </div>
              )}
              <div className="bg-background2 relative flex aspect-square items-center justify-center overflow-hidden rounded-lg">
                {item.thumbnailImageUrl ? (
                  <div className="relative size-full transition-transform duration-200 group-hover:scale-105">
                    <Image
                      loader={imageLoader}
                      src={item.thumbnailImageUrl}
                      alt={item.name}
                      fill
                      loading={idx < 5 ? "eager" : "lazy"}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <ImageOff className="stroke-signature size-[30%] stroke-[1.5] object-contain opacity-30" />
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between gap-2">
                <div className="space-y-1">
                  <p className="text-foreground2 text-xs font-medium">
                    {item.code}
                  </p>
                  <p className="line-clamp-2 text-sm font-bold">{item.name}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <p
                      key={tag.key}
                      className="bg-background2 text-signature rounded-md px-2 py-1 text-xs font-medium"
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
