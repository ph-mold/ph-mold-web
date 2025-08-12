import { imageLoader } from "@/lib/imageLoader";
import { ISampleRequest } from "@/types/api/sample-request";
import { formatCount, formatKoreanDateTime } from "@/utils/format";
import { Button } from "@ph-mold/ph-ui";
import { Calendar, ExternalLink, MapPin, Package, User } from "lucide-react";
import Image from "next/image";

interface props {
  sampleRequest: ISampleRequest;
}

export function SampleRequestInfo({ sampleRequest }: props) {
  return (
    <div className="border-border-strong bg-background rounded-lg border shadow-sm">
      <div className="">
        {/* 헤더 */}
        <div className="p-4 !pb-0 sm:p-6">
          <h4 className="text-foreground text-xl font-semibold">요청 정보</h4>
          <p className="text-foreground2 mt-2 text-sm">
            샘플 요청에 대한 상세 정보입니다
          </p>
        </div>

        {/* 제품 섹션 */}
        <div className="border-border-strong border-b p-4 sm:!p-6">
          <h5 className="text-foreground mb-4 flex items-center gap-2 text-lg font-medium">
            <Package size={20} className="text-signature" />
            제품 정보
          </h5>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* 제품 이미지 */}
            <div className="flex flex-col gap-3">
              <Image
                src={`${sampleRequest.product.thumbnailImageUrl}`}
                alt={`thumb-${sampleRequest.product.code}`}
                loader={imageLoader}
                className="border-border-strong bg-background2 rounded-lg border"
                width={160}
                height={160}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  window.open(
                    `/product/${sampleRequest.product.key}`,
                    "_blank"
                  );
                }}
                className="flex items-center gap-1.5"
                startIcon={<ExternalLink size={14} />}
              >
                제품 바로가기
              </Button>
            </div>

            {/* 제품 상세 정보 */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <span className="text-foreground2 block text-sm font-medium">
                    제품 코드
                  </span>
                  <p className="border-border-strong bg-background2 rounded-md border p-3 text-base font-medium">
                    {sampleRequest.product.code}
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-foreground2 block text-sm font-medium">
                    제품명
                  </span>
                  <p className="border-border-strong bg-background2 rounded-md border p-3 text-base font-medium">
                    {sampleRequest.product.name}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-foreground2 block text-sm font-medium">
                  요청 수량
                </span>
                <p className="border-border-strong bg-background2 rounded-md border p-3 text-base font-medium">
                  {formatCount(sampleRequest.quantity)} 개
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 신청자 정보 섹션 */}
        <div className="border-border-strong border-b p-4 sm:!p-6">
          <h5 className="text-foreground mb-4 flex items-center gap-2 text-lg font-medium">
            <User size={20} className="text-emerald-500" />
            신청자 정보
          </h5>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <span className="text-foreground2 block text-sm font-medium">
                신청자명
              </span>
              <p className="border-border-strong bg-background2 rounded-md border p-3 text-base font-medium">
                {sampleRequest.name}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-foreground2 block text-sm font-medium">
                회사명
              </span>
              <p className="border-border-strong bg-background2 rounded-md border p-3 text-base font-medium">
                {sampleRequest.company}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-foreground2 block text-sm font-medium">
                이메일
              </span>
              <p className="border-border-strong bg-background2 rounded-md border p-3 text-base font-medium break-all">
                {sampleRequest.email}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-foreground2 block text-sm font-medium">
                전화번호
              </span>
              <p className="border-border-strong bg-background2 rounded-md border p-3 text-base font-medium">
                {sampleRequest.phone}
              </p>
            </div>
          </div>
        </div>

        {/* 주소 정보 섹션 */}
        <div className="border-border-strong border-b p-4 sm:!p-6">
          <h5 className="text-foreground mb-4 flex items-center gap-2 text-lg font-medium">
            <MapPin size={20} className="text-red-500" />
            배송 주소
          </h5>

          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-foreground2 block text-sm font-medium">
                기본주소
              </span>
              <p className="border-border-strong bg-background2 rounded-md border p-3 text-base font-medium">
                {sampleRequest.address}
              </p>
            </div>

            {sampleRequest.detailedAddress && (
              <div className="space-y-2">
                <span className="text-foreground2 block text-sm font-medium">
                  상세주소
                </span>
                <p className="border-border-strong bg-background2 rounded-md border p-3 text-base font-medium">
                  {sampleRequest.detailedAddress}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 요청 일시 섹션 */}
        <div className="p-4 sm:!p-6">
          <h5 className="text-foreground mb-4 flex items-center gap-2 text-lg font-medium">
            <Calendar size={20} className="text-orange-500" />
            요청 일시
          </h5>

          <div className="space-y-2">
            <span className="text-foreground2 block text-sm font-medium">
              요청일시
            </span>
            <p className="border-border-strong bg-background2 rounded-md border p-3 text-base font-medium">
              {formatKoreanDateTime(sampleRequest.createdAt.toString())}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
