"use client";

import { Skeleton } from "@ph-mold/ph-ui";

export default function SubCategoryTabsSkeleton() {
  return (
    <div className="border-border-light scrollbar-hide w-full overflow-x-scroll overflow-y-hidden border-b-2">
      <div className="flex flex-row gap-3 pt-2 pb-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <Skeleton className="size-20 rounded-full sm:size-28" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
