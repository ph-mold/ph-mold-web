"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import Image from "next/image";
import Button from "@/components/common/Button";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { imageLoader } from "@/lib/imageLoader";
import "swiper/css";
import { IGetProductImage } from "@/types/api/product";
import useSWR from "swr";
import {
  GET_PRODUCT_IMAGES_BY_KEY,
  getProductImagesByKey
} from "@/lib/api/products";
import ProductImageGallerySkeleton from "./ProductImageGallery.skeleton";
import WithSkeleton from "../common/WithSkeleton";
import { notFound } from "next/navigation";

interface Props {
  productKey: string;
}

export default function ProductImageGallery({ productKey }: Props) {
  const {
    data: images,
    isLoading: isImagesLoading,
    error: imagesError
  } = useSWR<IGetProductImage[] | undefined>(
    [GET_PRODUCT_IMAGES_BY_KEY, productKey],
    () => getProductImagesByKey(productKey)
  );
  if (imagesError) {
    notFound();
  }

  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <WithSkeleton
      isLoading={isImagesLoading}
      skeleton={<ProductImageGallerySkeleton />}
    >
      <div className="flex flex-col gap-2">
        <div className="bg-background2 relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg">
          {images?.length === 0 ? (
            <ImageOff className="stroke-signature size-[30%] stroke-[1.5] object-contain opacity-30" />
          ) : (
            <>
              <Swiper
                loop={true}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
                spaceBetween={16}
                slidesPerView={1}
                className="h-full w-full"
              >
                {images?.map((image, idx) => (
                  <SwiperSlide key={idx} className="relative size-full">
                    <Image
                      loader={imageLoader}
                      src={image.url}
                      alt={`image-${image.id}`}
                      fill
                      style={{ objectFit: "contain" }}
                      loading="eager"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Button
                onClick={() => swiperRef.current?.slidePrev()}
                variant="text"
                size="large"
                className="absolute top-1/2 left-2 z-1 -translate-y-1/2 !p-3"
              >
                <ChevronLeft />
              </Button>
              <Button
                onClick={() => swiperRef.current?.slideNext()}
                variant="text"
                size="large"
                className="absolute top-1/2 right-2 z-1 -translate-y-1/2 !p-3"
              >
                <ChevronRight />
              </Button>
            </>
          )}
        </div>

        <div className="grid grid-cols-5 gap-2">
          {images?.map((image, idx) => (
            <Button
              key={idx}
              onClick={() => swiperRef.current?.slideToLoop(idx)}
              variant="text"
              className={`!bg-background2 aspect-square border-2 !p-0 ${
                idx === currentIndex ? "border-signature" : "border-transparent"
              }`}
            >
              <div className="relative h-full w-full">
                <Image
                  loader={imageLoader}
                  src={image.url}
                  alt={`thumb-${image.id}`}
                  fill
                  style={{ objectFit: "contain" }}
                  loading="eager"
                />
              </div>
            </Button>
          ))}
        </div>
      </div>
    </WithSkeleton>
  );
}
