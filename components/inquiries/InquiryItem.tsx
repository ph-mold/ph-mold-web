import { IInquiry, IInquiryWithoutPassword } from "@/types/api/inquiry";
import { Button } from "@ph-mold/ph-ui";
import { maskName, maskCompany, maskPhone } from "./utils";
import { STATUS_MAP } from "./constants";

interface InquiryItemProps {
  inquiry: IInquiry;
  isExpanded: boolean;
  detailData: IInquiryWithoutPassword | null;
  onToggle: () => void;
}

export function InquiryItem({
  inquiry,
  isExpanded,
  detailData,
  onToggle
}: InquiryItemProps) {
  const status = STATUS_MAP[inquiry.status];

  return (
    <div className="relative">
      <div
        className={`rounded-lg border-[1.5px] p-4 ${
          isExpanded
            ? "border-l-signature border-signature/30 bg-primary/5 border-l-4"
            : "border-border"
        }`}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="min-w-[100px] md:min-w-[120px]">
                <p className="font-medium">{maskCompany(inquiry.company)}</p>
                <p className="text-foreground2 text-sm">
                  {maskName(inquiry.name)}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-foreground2 text-sm">
                  연락처: {maskPhone(inquiry.phone)}
                </p>
                <p className="text-foreground2 text-sm">
                  문의일: {new Date(inquiry.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 sm:flex-col">
            <span
              className={`rounded-full px-2.5 py-0.5 text-sm ${status.color}`}
            >
              {status.label}
            </span>
            <Button variant="outlined" size="small" onClick={onToggle}>
              {isExpanded ? "접기" : "자세히"}
            </Button>
          </div>
        </div>
      </div>
      {isExpanded && detailData && detailData.id === inquiry.id && (
        <div className="absolute inset-0 z-10">
          <div className="border-l-signature border-signature/30 rounded-lg border-[1.5px] border-l-4 bg-white p-4 shadow-lg">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="min-w-[100px] md:min-w-[120px]">
                    <p className="font-medium">{detailData.company}</p>
                    <p className="text-foreground2 text-sm">
                      {detailData.name}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-foreground2 text-sm">
                      이메일: {detailData.email}
                    </p>
                    <p className="text-foreground2 text-sm">
                      연락처: {detailData.phone}
                    </p>
                    <p className="text-foreground2 text-sm">
                      문의일:{" "}
                      {new Date(detailData.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 sm:flex-col">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-sm ${status.color}`}
                >
                  {status.label}
                </span>
                <Button variant="outlined" size="small" onClick={onToggle}>
                  {isExpanded ? "접기" : "자세히"}
                </Button>
              </div>
            </div>
            <div className="border-border-strong mt-3 space-y-1 border-t pt-3">
              <p className="text-foreground2 text-sm">
                주소: {detailData.address}
              </p>
              {detailData.detailedAddress && (
                <p className="text-foreground2 text-sm">
                  상세주소: {detailData.detailedAddress}
                </p>
              )}
              {detailData.remarks && (
                <p className="text-foreground2 text-sm">
                  비고: {detailData.remarks}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
