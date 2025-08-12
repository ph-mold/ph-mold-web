import { ITrackerResponse } from "@/types/api/tracker";
import { API } from "../constants/api";
import useSWR from "swr";

// 환경 변수에서 API 키 가져오기
const clientId = process.env.NEXT_PUBLIC_TRACKER_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_TRACKER_CLIENT_SECRET;

// 고정된 GraphQL 쿼리
const TRACK_QUERY = `query Track(
$carrierId: ID!,
$trackingNumber: String!
) {
track(
  carrierId: $carrierId,
  trackingNumber: $trackingNumber
) {
  lastEvent {
    time
    status {
      code
      name
    }
    description
  }
  events(last: 10) {
    edges {
      node {
        time
        status {
          code
          name
        }
        description
      }
    }
  }
}
}`.trim();

// POST 요청을 위한 fetcher 함수
const postFetcher = async ([url, trackingNumber]: [string, string]) => {
  if (!clientId || !clientSecret) {
    throw new Error("Tracker API credentials not configured");
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `TRACKQL-API-KEY ${clientId}:${clientSecret}`
    },
    body: JSON.stringify({
      query: TRACK_QUERY,
      variables: {
        carrierId: "kr.cjlogistics",
        trackingNumber
      }
    })
  });

  if (!res.ok) {
    throw new Error(`Tracker API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

// 트래킹 정보 조회를 위한 useSWR 훅
export function useTrackingData(trackingNumber: string) {
  // 송장번호만 key로 사용
  const key = trackingNumber ? [API.TRACKER.TRACK, trackingNumber] : null;

  return useSWR(key, postFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 300000 // 5분간 중복 요청 방지
  });
}

// 기존 함수도 유지 (필요한 경우 사용)
export const TRACK_PACKAGE = "trackPackage";
export async function trackPackage(
  carrierId: string,
  trackingNumber: string
): Promise<ITrackerResponse> {
  if (!clientId || !clientSecret) {
    throw new Error("Tracker API credentials not configured");
  }

  const response = await fetch(API.TRACKER.TRACK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `TRACKQL-API-KEY ${clientId}:${clientSecret}`
    },
    body: JSON.stringify({
      query: TRACK_QUERY,
      variables: {
        carrierId,
        trackingNumber
      }
    })
  });

  if (!response.ok) {
    throw new Error(
      `Tracker API error: ${response.status} ${response.statusText}`
    );
  }

  const data: ITrackerResponse = await response.json();
  return data;
}
