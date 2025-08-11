"use client";

import {
  GET_SAMPLE_REQUEST_BY_TRACKING_CODE,
  getSampleRequestByTrackingCode
} from "@/lib/api/sample-request";
import { ISampleRequest } from "@/types/api/sample-request";
import useSWR from "swr";

export function SampleRequest({ trackingCode }: { trackingCode: string }) {
  const { data, isLoading, error } = useSWR<ISampleRequest | undefined>(
    [GET_SAMPLE_REQUEST_BY_TRACKING_CODE, trackingCode],
    () => getSampleRequestByTrackingCode(trackingCode)
  );
  return <div>{JSON.stringify(data, null, 2)}</div>;
}
