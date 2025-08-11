import { API } from "@/lib/constants/api";
import { fetcher } from "../fetcher";
import { ISampleRequest } from "@/types/api/sample-request";

export const GET_SAMPLE_REQUEST_BY_TRACKING_CODE =
  "getSampleRequestByTrackingCode";
export async function getSampleRequestByTrackingCode(
  trackingCode: string
): Promise<ISampleRequest | undefined> {
  const data = await fetcher<ISampleRequest>(
    API.SAMPLE_REQUESTS.GET_ONE_BY_TRACKING_CODE(trackingCode)
  );
  return data;
}
