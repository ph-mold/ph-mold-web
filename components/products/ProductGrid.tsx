"use client";

import Image from "next/image";

const sampleItems = Array.from({ length: 20 }).map((_, i) => ({
  id: `PMY-${i.toString().padStart(3, "0")}`,
  name: "1ml 주사기 / 시린지 / 백색",
  size: "18.2 × 13 × 83",
  imageUrl: "/sample1.png"
}));

export default function ProductGrid() {
  return (
    <div className="my-8 grid grid-cols-2 gap-3 space-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {sampleItems.map((item) => (
        <div key={item.id} className="flex flex-col gap-2">
          <div className="bg-background2 flex aspect-square items-center justify-center overflow-hidden rounded-lg">
            <Image
              src={item.imageUrl}
              alt={item.id}
              width={240}
              height={240}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold">{item.id}</p>
            <p className="text-sm">{item.name}</p>
            <p className="text-foreground2 text-xs">{item.size}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
