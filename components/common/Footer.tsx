"use client";

export default function Footer() {
  return (
    <footer className="border-background2 w-full border-t-2 py-6 text-center text-sm">
      <div className="mx-auto max-w-[1080px] px-6">
        {/* 회사 정보 */}
        <p className="font-semibold">(주)팜앤몰드</p>

        <p className="text-foreground2 mt-2">
          주소 : 경기 안양시 동안구 흥안대로 457-27 에이스하이테크시티 1105호
        </p>
        <p className="text-foreground2">
          대표 : 이건영 | 대표전화 : 031-381-5147 | 사업자등록번호 :
          220-09-50728
        </p>

        {/* 저작권 표시 */}
        <p className="text-foreground2 mt-4">
          Copyright © 2020 (주)팜앤몰드. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
