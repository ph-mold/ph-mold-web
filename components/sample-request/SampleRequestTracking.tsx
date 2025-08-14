import { ISampleRequest } from "@/types/api/sample-request";
import { formatDateTime } from "@/utils/format";
import { Clock, RefreshCw } from "lucide-react";
import { useTrackingData } from "@/lib/api/tracker-delivery";
import { mutate } from "swr";
import { API } from "@/lib/constants/api";
import { Button } from "@ph-mold/ph-ui";

interface props {
  sampleRequest: ISampleRequest;
}

export function SampleRequestTracking({ sampleRequest }: props) {
  const trackingNumber = sampleRequest.nodeData?.shipped?.trackingNumber;

  const {
    data: trackingData,
    error,
    isLoading
  } = useTrackingData(trackingNumber || "");

  // 캐시 초기화 및 재요청 함수
  const handleRefresh = () => {
    if (trackingNumber) {
      // useSWR의 mutate를 사용하여 캐시 무효화 및 재요청
      mutate([API.TRACKER.TRACK, trackingNumber]);
    }
  };

  // 송장번호가 없는 경우
  if (!trackingNumber) {
    return (
      <div className="border-border-strong bg-background rounded-lg border shadow-sm">
        <div className="p-6 text-center">
          <div className="bg-background2 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <Clock className="text-foreground2 h-8 w-8" />
          </div>
          <h4 className="text-foreground mb-2 text-lg font-semibold">
            송장번호가 없습니다
          </h4>
          <p className="text-foreground2 text-sm">
            샘플 요청이 발송되면 송장번호와 함께 배송 추적 정보가 표시됩니다
          </p>
        </div>
      </div>
    );
  }

  // 로딩 중
  if (isLoading) {
    return (
      <div className="border-border-strong bg-background rounded-lg border shadow-sm">
        <div className="p-6 text-center">
          <div className="bg-background2 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <Clock className="text-foreground2 h-8 w-8 animate-spin" />
          </div>
          <h4 className="text-foreground mb-2 text-lg font-semibold">
            배송 추적 정보를 불러오는 중...
          </h4>
        </div>
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <div className="border-border-strong bg-background rounded-lg border shadow-sm">
        <div className="p-6 text-center">
          <div className="bg-background2 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <Clock className="text-foreground2 h-8 w-8" />
          </div>
          <h4 className="text-foreground mb-2 text-lg font-semibold">
            배송 추적 정보를 불러올 수 없습니다
          </h4>
          <p className="text-foreground2 text-sm">
            배송 추적 정보를 불러오는데 실패했습니다.
          </p>
        </div>
      </div>
    );
  }

  // data.track이 null인 경우 처리
  if (!trackingData?.data.track) {
    return (
      <div className="border-border-strong bg-background rounded-lg border shadow-sm">
        <div className="p-6 text-center">
          <div className="bg-background2 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <Clock className="text-foreground2 h-8 w-8" />
          </div>
          <h4 className="text-foreground mb-2 text-lg font-semibold">
            아직 배송 추적 정보가 없습니다
          </h4>
          <p className="text-foreground2 text-sm">
            샘플 요청이 접수되면 배송 추적 정보가 표시됩니다
          </p>
        </div>
      </div>
    );
  }

  const events = trackingData.data.track.events.edges;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-2">
        <div className="space-y-2">
          <span className="text-foreground2 block text-sm font-medium">
            택배사
          </span>
          <p className="border-border-strong bg-background2 rounded-md border p-3 text-base font-medium">
            CJ 대한통운
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-foreground2 block text-sm font-medium">
            송장번호
          </span>
          <p className="border-border-strong bg-background2 rounded-md border p-3 text-base font-medium">
            {trackingNumber}
          </p>
        </div>
      </div>

      {/* 재요청 버튼 */}
      <div className="px-4 sm:px-6">
        <Button
          onClick={handleRefresh}
          disabled={isLoading}
          variant="outlined"
          startIcon={
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
          }
        >
          최신 정보로 업데이트
        </Button>
      </div>

      {/* 최종 상태 표시 */}
      {trackingData.data.track.lastEvent.status.code === "DELIVERED" && (
        <div className="p-4 sm:p-6">
          <div className="flex items-center rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="mr-3 h-3 w-3 rounded-full bg-green-500"></div>
            <div>
              <h3 className="font-semibold text-green-800">
                {trackingData.data.track.lastEvent.status.name}
              </h3>
              <p className="text-sm text-green-700">
                {trackingData.data.track.lastEvent.description}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="p-4 sm:p-6">
        <div className="relative">
          {/* 세로 연결선 */}
          <div className="absolute top-1.5 bottom-0 left-5.75 w-0.5 bg-blue-200"></div>

          {/* 이벤트들 - 역순으로 정렬 */}
          {[...events].reverse().map((event, index) => {
            const { date, time } = formatDateTime(event.node.time);
            const isLast = index === 0; // 역순이므로 첫 번째가 마지막 이벤트

            return (
              <div key={index} className="relative mb-6 flex items-start">
                {/* 원형 점 */}
                <div
                  className={`absolute top-1.5 left-4 h-4 w-4 rounded-full border-2 border-white shadow-sm ${
                    isLast ? "bg-green-500" : "bg-blue-500"
                  }`}
                />

                {/* 내용 */}
                <div className="ml-12 flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        isLast
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {event.node.status.name}
                    </span>
                    <div className="text-foreground2 flex items-center gap-1 text-sm">
                      <span className="font-medium">{date}</span>
                      <span>{time}</span>
                    </div>
                  </div>

                  <p className="text-foreground2 mt-2 pl-2 text-sm">
                    {event.node.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
