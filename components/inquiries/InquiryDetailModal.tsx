import { IInquiryWithoutPassword } from "@/types/api/inquiry";
import { Modal } from "@ph-mold/ph-ui";
import { MapPin, User, MessageSquare } from "lucide-react";
import { STATUS_MAP } from "./constants";

interface Props {
  open: boolean;
  onClose: () => void;
  detailData: IInquiryWithoutPassword | null;
}

export function InquiryDetailModal({ open, onClose, detailData }: Props) {
  if (!detailData) return null;
  const status = STATUS_MAP[detailData.status];

  return (
    <Modal open={open} onClose={onClose} title="문의" bodyClassName="!p-0">
      <div className="space-y-0">
        {/* 상태 및 요청일시 섹션 */}
        <div className="border-border-strong border-b p-4 sm:!p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-foreground2 text-sm font-medium">
                처리 상태
              </span>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${status.color} ${status.borderColor} border`}
              >
                {status.label}
              </span>
            </div>
            <span className="text-foreground text-sm font-medium">
              {new Date(detailData.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>
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
              <p className="border-border-strong bg-background2 overflow-x-auto rounded-md border p-3 text-base font-medium">
                {detailData.name}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-foreground2 block text-sm font-medium">
                회사명
              </span>
              <p className="border-border-strong bg-background2 overflow-x-auto rounded-md border p-3 text-base font-medium">
                {detailData.company}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-foreground2 block text-sm font-medium">
                이메일
              </span>
              <p className="border-border-strong bg-background2 overflow-x-auto rounded-md border p-3 text-base font-medium">
                {detailData.email}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-foreground2 block text-sm font-medium">
                전화번호
              </span>
              <p className="border-border-strong bg-background2 overflow-x-auto rounded-md border p-3 text-base font-medium">
                {detailData.phone}
              </p>
            </div>
          </div>
        </div>

        {/* 주소 정보 섹션 */}
        <div className="border-border-strong border-b p-4 sm:!p-6">
          <h5 className="text-foreground mb-4 flex items-center gap-2 text-lg font-medium">
            <MapPin size={20} className="text-red-500" />
            주소 정보
          </h5>

          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-foreground2 block text-sm font-medium">
                기본주소
              </span>
              <p className="border-border-strong bg-background2 overflow-x-auto rounded-md border p-3 text-base font-medium">
                {detailData.address}
              </p>
            </div>

            {detailData.detailedAddress && (
              <div className="space-y-2">
                <span className="text-foreground2 block text-sm font-medium">
                  상세주소
                </span>
                <p className="border-border-strong bg-background2 overflow-x-auto rounded-md border p-3 text-base font-medium">
                  {detailData.detailedAddress}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 비고 섹션 */}
        {detailData.remarks && (
          <div className="p-4 sm:!p-6">
            <h5 className="text-foreground mb-4 flex items-center gap-2 text-lg font-medium">
              <MessageSquare size={20} className="text-blue-500" />
              문의 내용
            </h5>
            <p className="border-border-strong bg-background2 rounded-md border p-3 text-base font-medium break-all">
              {detailData.remarks}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
