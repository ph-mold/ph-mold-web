"use client";

import {
  GET_SAMPLE_REQUEST_BY_TRACKING_CODE,
  getSampleRequestByTrackingCode
} from "@/lib/api/sample-request";
import { ISampleRequest } from "@/types/api/sample-request";
import useSWR from "swr";
import { SampleRequestTimeline } from "./SampleRequestTimeLine";
import { notFound } from "next/navigation";
import { SampleRequestInfo } from "./SampleRequestInfo";

export function SampleRequest({ trackingCode }: { trackingCode: string }) {
  const { data, isLoading, error } = useSWR<ISampleRequest | undefined>(
    [GET_SAMPLE_REQUEST_BY_TRACKING_CODE, trackingCode],
    () => getSampleRequestByTrackingCode(trackingCode)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error?.status === 404) notFound();
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="space-y-4">
      <SampleRequestTimeline sampleRequest={data!} />
      <SampleRequestInfo sampleRequest={data!} />
    </div>
  );
}
