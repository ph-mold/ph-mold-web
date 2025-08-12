import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { IInquiryWithoutPassword } from "@/types/api/inquiry";
import {
  getInquiries,
  postInquiryDetail,
  GET_INQUIRIES
} from "@/lib/api/inquiry";
import { PasswordModal } from "./PasswordModal";
import { InquiryItem } from "./InquiryItem";
import { Pagination, WithSkeleton } from "@ph-mold/ph-ui";
import { InquiryListSkeleton } from "./InquiryList.skeleton";
import useSWR from "swr";

export default function InquiryList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expandedInquiryId, setExpandedInquiryId] = useState<string | null>(
    null
  );
  const [selectedInquiryId, setSelectedInquiryId] = useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
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

  const { data, isLoading } = useSWR(
    [GET_INQUIRIES, currentPage, itemsPerPage],
    () => getInquiries(currentPage, itemsPerPage)
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedInquiryId(null);
    setSelectedInquiryId(null);

    // URL 업데이트
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/inquiries?${params.toString()}`);
  };

  const handlePasswordVerify = async (password: string) => {
    if (!selectedInquiryId) return false;

    const data = await postInquiryDetail(selectedInquiryId, password);
    if (data) {
      setDetailData(data);
      setExpandedInquiryId(String(selectedInquiryId));
      setSelectedInquiryId(null);
      return true;
    }
    return false;
  };

  return (
    <div className="space-y-2">
      <WithSkeleton isLoading={isLoading} skeleton={<InquiryListSkeleton />}>
        <div className="grid grid-rows-[repeat(5,minmax(0,1fr))] gap-2">
          {(data?.items ?? []).map((inquiry) => {
            const isExpanded = expandedInquiryId === inquiry.id.toString();

            return (
              <div key={inquiry.id} className="relative">
                <InquiryItem
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
              </div>
            );
          })}
          {Array(Math.max(0, itemsPerPage - (data?.items?.length || 0)))
            .fill(0)
            .map((_, index) => (
              <div key={`empty-${index}`} aria-hidden="true" />
            ))}

          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages ?? 0}
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
