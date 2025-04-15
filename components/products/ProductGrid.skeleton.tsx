"use client";

import { Skeleton } from "../common/Skeleton";

export default function ProductGridSkeleton() {
  return (
    <div className="my-8 grid grid-cols-2 gap-3 space-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 20 }).map((_, idx) => (
        <div key={idx} className="relative flex flex-col gap-2">
          <div className="bg-background2 flex aspect-square items-center justify-center overflow-hidden rounded-lg">
            <Skeleton className="size-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-26" />
            <div className="flex flex-wrap space-y-1 space-x-1 py-1">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="h-6 w-10" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
