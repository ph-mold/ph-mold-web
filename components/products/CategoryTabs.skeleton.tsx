"use client";

import { Skeleton } from "@ph-mold/ph-ui";

export default function CategoryTabsSkeleton() {
  return (
    <div className="border-background2 bg-background/80 sticky top-16 z-9 h-12 w-full border-b-2 backdrop-blur-md">
      <div className="scrollbar-hide mx-auto max-w-[1280px] overflow-x-scroll">
        <div className="flex w-fit gap-3 px-4 md:px-10">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-12 w-15 px-1 py-2">
              <Skeleton className="size-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
