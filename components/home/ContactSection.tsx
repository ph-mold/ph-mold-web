"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold md:text-5xl">문의</h2>
        <p className="text-foreground2 text-lg">
          궁금하신 점이 있으시다면 문의해주세요
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-4 md:mx-auto"
      >
        <div className="border-background2 bg-background overflow-hidden rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:shadow-xl sm:mx-auto sm:w-[600px]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이름/이메일 */}
            <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-foreground text-sm font-medium"
                >
                  이름
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="홍길동"
                  className="border-background2 bg-background2 focus:ring-signature rounded-lg border px-4 py-2.5 focus:ring-2 focus:outline-none"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-foreground text-sm font-medium"
                >
                  이메일
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ph-mold@hanmail.com"
                  className="border-background2 bg-background2 focus:ring-signature rounded-lg border px-4 py-2.5 focus:ring-2 focus:outline-none"
                />
              </div>
            </div>

            {/* 메시지 */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-foreground text-sm font-medium"
              >
                문의 내용
              </label>
              <textarea
                name="message"
                id="message"
                rows={8}
                value={form.message}
                onChange={handleChange}
                placeholder="내용 작성"
                className="border-background2 bg-background2 focus:ring-signature resize-none rounded-lg border px-4 py-2.5 focus:ring-2 focus:outline-none"
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
      </motion.div>
    </section>
  );
}
