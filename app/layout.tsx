import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { SWRProvider } from "./swr-provider";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "(주)팜앤몰드",
  description: "화장품 용기 전문 판매 업체"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKr.variable} flex min-h-screen flex-col font-sans`}
      >
        <SWRProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SWRProvider>
      </body>
    </html>
  );
}
