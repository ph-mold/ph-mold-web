import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@ph-mold/ph-ui";
import { PasswordModal } from "./PasswordModal";
import { Pagination } from "../common/Pagination";
import { IInquiry, IInquiryWithoutPassword } from "@/types/api/inquiry";
import { maskName, maskCompany, maskPhone } from "./utils";
import { STATUS_MAP } from "./constants";
import { getInquiries, postInquiryDetail } from "@/lib/api/inquiry";

export default function InquiryList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expandedInquiryId, setExpandedInquiryId] = useState<string | null>(
    null
  );
  const [selectedInquiryId, setSelectedInquiryId] = useState<number | null>(
    null
  );
  const [inquiries, setInquiries] = useState<IInquiry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [detailData, setDetailData] = useState<IInquiryWithoutPassword | null>(
    null
  );
  const itemsPerPage = 5;

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await getInquiries(currentPage, itemsPerPage);
        setInquiries(data?.items ?? []);
        setTotalPages(data?.totalPages ?? 0);

        // URL 업데이트
        const params = new URLSearchParams(searchParams);
        params.set("page", currentPage.toString());
        router.push(`/inquiries?${params.toString()}`);
      } catch (error) {
        console.error("Failed to fetch inquiries:", error);
      }
    };

    fetchInquiries();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedInquiryId(null);
    setSelectedInquiryId(null);
  };

  const handlePasswordVerify = async (password: string) => {
    if (!selectedInquiryId) return false;

    try {
      const data = await postInquiryDetail(selectedInquiryId, password);
      if (data) {
        setDetailData(data);
        setExpandedInquiryId(String(selectedInquiryId));
        setSelectedInquiryId(null);
        return true;
      }
    } catch (error) {
      console.error("Failed to verify password:", error);
    }
    return false;
  };

  return (
    <div className="space-y-2">
      {inquiries.map((inquiry) => {
        const isExpanded = expandedInquiryId === inquiry.id.toString();
        const status = STATUS_MAP[inquiry.status];

        return (
          <div
            key={inquiry.id}
            className={`bg- rounded-lg border-[1.5px] p-4 ${
              isExpanded
                ? "border-l-signature border-signature/30 bg-primary/5 border-l-4"
                : "border-background2"
            }`}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="min-w-[100px] md:min-w-[120px]">
                    <p className="font-medium">
                      {isExpanded
                        ? inquiry.company
                        : maskCompany(inquiry.company)}
                    </p>
                    <p className="text-foreground2 text-sm">
                      {isExpanded ? inquiry.name : maskName(inquiry.name)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {!isExpanded && (
                      <>
                        <p className="text-foreground2 text-sm">
                          연락처: {maskPhone(inquiry.phone)}
                        </p>
                        <p className="text-foreground2 text-sm">
                          문의일:{" "}
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </p>
                      </>
                    )}
                    {isExpanded &&
                      detailData &&
                      detailData.id === inquiry.id && (
                        <>
                          <p className="text-foreground2 text-sm">
                            이메일: {detailData.email}
                          </p>
                          <p className="text-foreground2 text-sm">
                            연락처: {detailData.phone}
                          </p>
                          <p className="text-foreground2 text-sm">
                            문의일:{" "}
                            {new Date(
                              detailData.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </>
                      )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 sm:flex-col">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-sm ${status.color}`}
                >
                  {status.label}
                </span>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    if (isExpanded) {
                      setExpandedInquiryId(null);
                      setDetailData(null);
                    } else {
                      setSelectedInquiryId(inquiry.id);
                    }
                  }}
                >
                  {isExpanded ? "접기" : "자세히"}
                </Button>
              </div>
            </div>
            {isExpanded && detailData && detailData.id === inquiry.id && (
              <div className="border-background2 mt-3 space-y-1 border-t pt-3">
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
            )}
          </div>
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <PasswordModal
        open={selectedInquiryId !== null}
        onClose={() => setSelectedInquiryId(null)}
        onVerify={handlePasswordVerify}
      />
    </div>
  );
}
