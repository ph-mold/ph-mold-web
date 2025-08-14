"use client";

import { Skeleton } from "@ph-mold/ph-ui";

export default function SampleRequestSkeleton() {
  return (
    <div className="space-y-4">
      <div className="border-border-strong flex flex-col gap-1 space-y-4 rounded-lg border p-4 sm:!p-6">
        <Skeleton className="h-7 w-34" />
        <div className="flex flex-row gap-1">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="border-border-strong flex flex-col gap-1 space-y-4 rounded-lg border p-4 sm:!p-6">
        <div className="flex flex-row gap-1">
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-full" />
        </div>
        <Skeleton className="h-7 w-30" />
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-40 w-40" />
            <Skeleton className="h-8 w-full" />
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-12 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <Skeleton className="h-7 w-30" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <Skeleton className="h-7 w-30" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <Skeleton className="h-7 w-30" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
