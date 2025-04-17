"use client";
import { imageLoader } from "@/lib/imageLoader";
import Image from "next/image";

export default function ProductImageGallery() {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-background2 flex aspect-square items-center justify-center overflow-hidden rounded-lg">
        <Image
          loader={imageLoader}
          src={"/sample1.png"}
          alt={"test"}
          width={240}
          height={240}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-background2 flex aspect-square items-center justify-center overflow-hidden rounded-sm"
          >
            <Image
              loader={imageLoader}
              src={"/sample1.png"}
              alt={"test"}
              width={240}
              height={240}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
