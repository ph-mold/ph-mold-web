export function InquiryListSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="border-background2 rounded-lg border-[1.5px] p-4"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="min-w-[100px] md:min-w-[120px]">
                  <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
                  <div className="mt-1 h-4 w-16 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 sm:flex-col">
              <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
              <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
