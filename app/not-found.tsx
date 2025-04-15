import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mt-16 flex min-h-[300px] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <SearchX className="stroke-foreground2 size-20 stroke-[1px]" />
        <p className="text-foreground2 text-lg">페이지를 찾을 수 없습니다.</p>
      </div>
    </div>
  );
}
