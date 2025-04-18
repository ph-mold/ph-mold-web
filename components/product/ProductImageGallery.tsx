"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import Image from "next/image";
import Button from "@/components/common/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { imageLoader } from "@/lib/imageLoader";
import "swiper/css";

const thumbnails = Array.from({ length: 4 }, (_, i) => `/sample${i + 1}.png`);

export default function ProductImageGallery() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-background2 relative aspect-square w-full overflow-hidden rounded-lg">
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
          {thumbnails.map((src, idx) => (
            <SwiperSlide key={idx}>
              <Image
                loader={imageLoader}
                src={src}
                alt={`image-${idx}`}
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
      </div>

      <div className="grid grid-cols-5 gap-2">
        {thumbnails.map((src, idx) => (
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
              src={src}
              alt={`thumb-${idx}`}
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
