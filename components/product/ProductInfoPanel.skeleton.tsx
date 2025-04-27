"use client";

import { Skeleton } from "@ph-mold/ph-ui";

export default function ProductInfoPanelSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-5 w-22" />
          <Skeleton className="h-6 w-45" />
        </div>
        <div className="flex flex-wrap space-y-1 space-x-1 py-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-7 w-14" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="flex flex-row justify-between">
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-5 w-15" />
          </div>
        ))}
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
