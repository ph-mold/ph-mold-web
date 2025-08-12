"use client";

import {
  GET_SAMPLE_REQUEST_BY_TRACKING_CODE,
  getSampleRequestByTrackingCode
} from "@/lib/api/sample-request";
import { ISampleRequest, isStatusCompleted } from "@/types/api/sample-request";
import useSWR from "swr";
import { SampleRequestTimeline } from "./SampleRequestTimeLine";
import { notFound } from "next/navigation";
import { SampleRequestInfo } from "./SampleRequestInfo";
import { SampleRequestTracking } from "./SampleRequestTracking";
import { useTabNavigation } from "@/hooks/useTabNavigation";

export function SampleRequest({ trackingCode }: { trackingCode: string }) {
  const { activeTab, handleTabClick } = useTabNavigation({
    tabs: [
      { label: "샘플 요청 정보", value: "info" },
      { label: "배송 추적", value: "tracking" }
    ],
    mode: "query",
    basePath: `/sample-request/${trackingCode}`
  });

  const { data, isLoading, error } = useSWR<ISampleRequest | undefined>(
    [GET_SAMPLE_REQUEST_BY_TRACKING_CODE, trackingCode],
    () => getSampleRequestByTrackingCode(trackingCode)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error?.status === 404) notFound();
  if (error) return <div>Error: {error.message}</div>;

  const showTrackingTab = data && isStatusCompleted(data.status, "shipped");

  return (
    <div className="space-y-4">
      <SampleRequestTimeline sampleRequest={data!} />

      {/* 탭 네비게이션 */}
      <div className="border-border-strong bg-background rounded-lg border shadow-sm">
        <div className="border-border-strong flex border-b">
          <button
            onClick={() => handleTabClick("info")}
            className={`flex-1 cursor-pointer px-8 py-4 text-base font-medium transition-colors ${
              activeTab === "info"
                ? "border-signature text-signature border-b-2"
                : "text-foreground2 hover:text-foreground"
            }`}
          >
            샘플 요청 정보
          </button>
          {showTrackingTab && (
            <button
              onClick={() => handleTabClick("tracking")}
              className={`flex-1 cursor-pointer px-8 py-4 text-base font-medium transition-colors ${
                activeTab === "tracking"
                  ? "border-signature text-signature border-b-2"
                  : "text-foreground2 hover:text-foreground"
              }`}
            >
              배송 추적
            </button>
          )}
        </div>

        {/* 탭 콘텐츠 */}
        <>
          {activeTab === "info" && <SampleRequestInfo sampleRequest={data!} />}
          {activeTab === "tracking" && showTrackingTab && (
            <SampleRequestTracking sampleRequest={data!} />
          )}
        </>
      </div>
    </div>
  );
}
