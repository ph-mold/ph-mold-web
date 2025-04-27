import { Skeleton } from "@ph-mold/ph-ui";

export default function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-14" />
      <Skeleton className="mb-2 h-7" />
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-60" />
        <div className="mb-2 flex flex-col gap-2">
          <Skeleton className="h-6" />
          <Skeleton className="h-3" />
          <Skeleton className="h-4" />
          <Skeleton className="h-8" />
        </div>
      </div>
      <Skeleton className="h-14" />
      <Skeleton className="mb-2 h-7" />
    </div>
  );
}
