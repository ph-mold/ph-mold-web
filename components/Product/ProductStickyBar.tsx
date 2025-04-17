"use client";

import Button from "../common/Button";

export default function ProductStickyBar() {
  return (
    <div className="border-background2 sticky top-16 z-9 w-full border-b-2 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1080px] flex-row items-center justify-between px-4 py-2 md:px-10">
        <div className="flex flex-col">
          <p className="text-foreground2 text-xs">SYRPP001001</p>
          <p className="text-sm font-bold">1ml PP 주사기</p>
        </div>
        <Button className="w-24" size="small">
          샘플요청
        </Button>
      </div>
    </div>
  );
}
