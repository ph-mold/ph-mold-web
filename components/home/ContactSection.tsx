"use client";

import { Button } from "@ph-mold/ph-ui";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section
      id="문의"
      className="border-border-light flex h-fit flex-col gap-8 border-t-2 py-20"
    >
      <div className="mb-4 text-center">
        <h2 className="mb-4 text-4xl font-bold md:text-5xl">문의</h2>
        <p className="text-foreground2 text-lg">
          궁금하신 점이 있으시다면 문의해주세요
        </p>
      </div>
      <div className="mx-auto">
        <Link href="/inquiries">
          <Button>문의하기</Button>
        </Link>
      </div>
    </section>
  );
}
