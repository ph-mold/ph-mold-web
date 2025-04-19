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

interface Props {
  images: IGetProductImage[];
}

export default function ProductImageGallery({ images }: Props) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-background2 relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg">
        {images.length === 0 ? (
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
              {images.map((image, idx) => (
                <SwiperSlide key={idx}>
                  <Image
                    loader={imageLoader}
                    src={image.url}
                    alt={`image-${image.id}`}
                    width={600}
                    height={600}
                    className="h-full w-full object-contain"
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
        {images.map((image, idx) => (
          <Button
            key={idx}
            onClick={() => swiperRef.current?.slideToLoop(idx)}
            variant="text"
            className={`!bg-background2 border-2 !p-0 ${
              idx === currentIndex ? "border-signature" : "border-transparent"
            }`}
          >
            <Image
              loader={imageLoader}
              src={image.url}
              alt={`thumb-${image.id}`}
              width={120}
              height={120}
              className="h-full w-full object-contain"
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
