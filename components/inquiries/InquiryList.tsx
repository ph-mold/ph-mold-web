import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { IInquiry, IInquiryWithoutPassword } from "@/types/api/inquiry";
import { getInquiries, postInquiryDetail } from "@/lib/api/inquiry";
import { PasswordModal } from "./PasswordModal";
import { Pagination } from "../common/Pagination";
import { InquiryItem } from "./InquiryItem";
import { WithSkeleton } from "@ph-mold/ph-ui";
import { InquiryListSkeleton } from "./InquiryList.skeleton";

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
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchInquiries = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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
      <WithSkeleton isLoading={isLoading} skeleton={<InquiryListSkeleton />}>
        <div className="space-y-2">
          {inquiries.map((inquiry) => {
            const isExpanded = expandedInquiryId === inquiry.id.toString();

            return (
              <InquiryItem
                key={inquiry.id}
                inquiry={inquiry}
                isExpanded={isExpanded}
                detailData={detailData}
                onToggle={() => {
                  if (isExpanded) {
                    setExpandedInquiryId(null);
                    setDetailData(null);
                  } else {
                    setSelectedInquiryId(inquiry.id);
                  }
                }}
              />
            );
          })}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </WithSkeleton>

      <PasswordModal
        open={selectedInquiryId !== null}
        onClose={() => setSelectedInquiryId(null)}
        onVerify={handlePasswordVerify}
      />
    </div>
  );
}
