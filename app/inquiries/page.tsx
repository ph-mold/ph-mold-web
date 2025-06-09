"use client";

import { useState, Suspense } from "react";
import { Button } from "@ph-mold/ph-ui";
import InquiryForm from "@/components/inquiries/InquiryForm";
import InquiryList from "@/components/inquiries/InquiryList";

export default function InquiriesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="container mx-auto space-y-6 px-4 py-8 md:py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold md:text-3xl">문의하기</h1>
        <Button onClick={() => setIsFormOpen(!isFormOpen)} size="medium">
          {isFormOpen ? "접기" : "문의하기"}
        </Button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isFormOpen
            ? "my-8 max-h-[2000px] opacity-100"
            : "my-0 max-h-0 opacity-0"
        }`}
      >
        <div className="border-background2 bg-background w-full rounded-xl border-[1.5px] p-4 md:p-8">
          <InquiryForm onClose={() => setIsFormOpen(false)} />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-2xl font-bold md:text-3xl">문의 내역</h2>
        <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
          <InquiryList />
        </Suspense>
      </div>
    </div>
  );
}
