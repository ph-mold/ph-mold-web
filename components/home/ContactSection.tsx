"use client";

import { useState } from "react";
import SectionTitle from "../common/SectionTitle";
import { SendHorizonal } from "lucide-react";
import { Button } from "@ph-mold/ph-ui";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 전송 로직 구현
    console.log(form);
  };

  return (
    <section
      id="문의"
      className="border-background2 flex h-fit flex-col gap-8 border-t-2 py-20"
    >
      <SectionTitle>문의</SectionTitle>
      <div className="border-background2 bg-background my-4 w-full rounded-xl p-6 sm:mx-auto sm:w-fit sm:border-2">
        <form onSubmit={handleSubmit} className="mx-autow-full space-y-4">
          {/* 이름/이메일 */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex flex-1 flex-col">
              <label htmlFor="name" className="mb-1 text-sm text-gray-600">
                이름
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                placeholder="홍길동"
                className="bg-background2 rounded-md px-4 py-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="email" className="mb-1 text-sm text-gray-600">
                이메일
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ph-mold@hanmail.com"
                className="bg-background2 rounded-md px-4 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* 메시지 */}
          <div className="flex flex-col">
            <label htmlFor="message" className="mb-1 text-sm text-gray-600">
              문의 내용
            </label>
            <textarea
              name="message"
              id="message"
              rows={8}
              value={form.message}
              onChange={handleChange}
              placeholder="내용 작성"
              className="bg-background2 resize-none rounded-md px-4 py-2 focus:outline-none"
            />
          </div>

          {/* 전송 버튼 */}
          <Button
            disabled
            type="submit"
            fullWidth
            className="!font-semibold"
            endIcon={<SendHorizonal className="size-4" />}
          >
            문의하기
          </Button>
        </form>
      </div>
    </section>
  );
}
