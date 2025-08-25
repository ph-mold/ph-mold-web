import { IInquiryWithoutPassword } from "@/types/api/inquiry";
import { Button, Modal, TextArea } from "@ph-mold/ph-ui";
import {
  MapPin,
  User,
  MessageSquare,
  Clock,
  Send,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { STATUS_MAP } from "./constants";
import { IReply } from "@/types/api/inquiry";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  detailData: IInquiryWithoutPassword | null;
}

export function InquiryDetailModal({ open, onClose, detailData }: Props) {
  const [isApplicantInfoOpen, setIsApplicantInfoOpen] = useState(false);
  const [isAddressInfoOpen, setIsAddressInfoOpen] = useState(false);

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

        {/* 문의 내용 및 답변 섹션 (맨 위로 이동) */}
        {detailData.remarks && (
          <div className="border-border-strong space-y-4 border-b p-4 sm:!p-6">
            <h5 className="text-foreground mb-4 flex items-center gap-2 text-lg font-medium">
              <MessageSquare size={20} className="text-signature" />
              문의 내용
            </h5>
            <div className="border-border-strong rounded-lg border p-4">
              <p className="whitespace-pre-wraptext-blue-700 text-sm">
                {detailData.remarks}
              </p>
            </div>

            {/* 답변 섹션 */}
            <div>
              {/* 기존 답변들 표시 */}
              {detailData.replies && detailData.replies.length > 0 ? (
                <div className="mb-4 space-y-3">
                  <h6 className="text-foreground text-sm font-medium">
                    답변 목록
                  </h6>
                  {detailData.replies.map((reply: IReply, index: number) => (
                    <div
                      key={reply.id || index}
                      className={`flex ${
                        reply.replyType === "COMPANY"
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          reply.replyType === "COMPANY"
                            ? "border-border-strong border"
                            : "border border-green-200 bg-green-100"
                        }`}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <User size={12} className="text-gray-600" />
                          <span className="text-xs font-medium text-gray-700">
                            {reply.replyType === "COMPANY" ? "팜앤몰드" : ""}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(reply.createdAt).toLocaleString("ko-KR", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap text-gray-800">
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span className="text-sm">
                      아직 답변이 등록되지 않았습니다.
                    </span>
                  </div>
                </div>
              )}

              {/* 고객 답변 입력 */}
              <div className="space-y-3">
                <h6 className="text-foreground text-sm font-medium">
                  답변 작성
                </h6>
                <div className="flex flex-col items-center gap-2">
                  <TextArea
                    placeholder="답변을 입력해주세요..."
                    rows={4}
                    className="w-full"
                  />

                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<Send size={16} />}
                    className="ml-auto"
                  >
                    답변
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 신청자 정보 섹션 (토글) */}
        <div className="border-border-strong border-b">
          <button
            onClick={() => setIsApplicantInfoOpen(!isApplicantInfoOpen)}
            className="flex w-full cursor-pointer items-center justify-between p-4 sm:!p-6"
          >
            <h5 className="text-foreground flex items-center gap-2 text-lg font-medium">
              <User size={20} className="text-emerald-500" />
              신청자 정보
            </h5>
            {isApplicantInfoOpen ? (
              <ChevronDown size={20} className="text-gray-500" />
            ) : (
              <ChevronRight size={20} className="text-gray-500" />
            )}
          </button>

          {isApplicantInfoOpen && (
            <div className="border-border-strong border-t p-4 sm:!p-6">
              <div className="space-y-4">
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
          )}
        </div>

        {/* 주소 정보 섹션 (토글) */}
        <div>
          <button
            onClick={() => setIsAddressInfoOpen(!isAddressInfoOpen)}
            className="flex w-full cursor-pointer items-center justify-between p-4 sm:!p-6"
          >
            <h5 className="text-foreground flex items-center gap-2 text-lg font-medium">
              <MapPin size={20} className="text-red-500" />
              주소 정보
            </h5>
            {isAddressInfoOpen ? (
              <ChevronDown size={20} className="text-gray-500" />
            ) : (
              <ChevronRight size={20} className="text-gray-500" />
            )}
          </button>

          {isAddressInfoOpen && (
            <div className="border-border-strong border-t p-4 sm:!p-6">
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
          )}
        </div>
      </div>
    </Modal>
  );
}
