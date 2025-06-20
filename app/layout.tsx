import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { SWRProvider } from "./swr-provider";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import Script from "next/script";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: {
    template: `%s | (주)팜앤몰드`,
    default: "팜앤몰드"
  },
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
        <GoogleAnalytics />
        <SWRProvider>
          <Header />
          <main className="mt-16 flex-1">{children}</main>
          <Footer />
        </SWRProvider>
        <div id="modal-root" />
        <Script
          src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
