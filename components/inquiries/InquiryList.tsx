import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { IInquiry } from "@/types/api/inquiry";
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
import { InquiryDetailModal } from "./InquiryDetailModal";

export default function InquiryList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [selectedInquiryId, setSelectedInquiryId] = useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [detailData, setDetailData] = useState<IInquiry | null>(null);
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
    setIsOpenDetail(false);
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
      setDetailData({ ...data, password: password });
      setIsOpenDetail(true);
      setSelectedInquiryId(null);
      return true;
    }
    return false;
  };

  return (
    <div className="space-y-2">
      <WithSkeleton isLoading={isLoading} skeleton={<InquiryListSkeleton />}>
        <div className="flex flex-col gap-2">
          {(data?.items ?? []).map((inquiry) => {
            return (
              <InquiryItem
                key={inquiry.id}
                inquiry={inquiry}
                onToggle={() => {
                  setSelectedInquiryId(inquiry.id);
                }}
              />
            );
          })}

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
      <InquiryDetailModal
        open={isOpenDetail}
        onClose={() => setIsOpenDetail(false)}
        detailData={detailData}
      />
    </div>
  );
}
