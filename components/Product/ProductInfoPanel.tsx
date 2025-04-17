"use client";

import Button from "../common/Button";

const DETAIL_ITEMS = [
  { label: "용량", value: "65ml" },
  { label: "사이즈", value: "66mm x 66mm x 42mm" },
  { label: "넥파이", value: "52Ø" },
  { label: "제조국", value: "한국" },
  { label: "최소 주문 수량 (MOQ)", value: "10,000" }
];

export default function ProductInfoPanel() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-foreground2 text-sm">SYRPP001001</p>
        <p className="text-lg font-bold">1ml PP 주사기</p>
        <div className="flex flex-wrap space-y-1 space-x-1 py-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <p
              key={idx}
              className="bg-background2 text-signature h-7 rounded-md px-2 py-1 text-sm text-nowrap"
            >
              {"태그" + (idx + 1)}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-2">
        {DETAIL_ITEMS.map((item, idx) => (
          <div key={idx} className="flex flex-row justify-between">
            <p className="text-sm font-semibold">{item.label}</p>
            <p className="text-sm">{item.value}</p>
          </div>
        ))}
      </div>
      <Button size="medium" fullWidth>
        샘플 요청
      </Button>
    </div>
  );
}
