import { IInquiry } from "@/types/api/inquiry";
import { Button } from "@ph-mold/ph-ui";
import { maskName, maskCompany, maskPhone } from "./utils";
import { STATUS_MAP } from "./constants";

interface InquiryItemProps {
  inquiry: IInquiry;
  onToggle: () => void;
}

export function InquiryItem({ inquiry, onToggle }: InquiryItemProps) {
  const status = STATUS_MAP[inquiry.status];

  return (
    <div className="relative">
      <div className="border-border rounded-lg border-[1.5px] p-4">
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
              자세히
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
