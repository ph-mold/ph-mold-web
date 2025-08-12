import { ISampleRequest } from "@/types/api/sample-request";
import { formatDateTime } from "@/utils/format";
import { Clock } from "lucide-react";

// const trackingData = {
//   data: {
//     track: null
//   }
// };

const trackingData = {
  data: {
    track: {
      lastEvent: {
        time: "2025-08-12T14:49:17.000+09:00",
        description:
          "고객님의 상품이 배송완료 되었습니다.(담당사원:유동현 010-9149-5225)",
        status: {
          code: "DELIVERED",
          name: "배송완료"
        }
      },
      events: {
        edges: [
          {
            node: {
              time: "2025-08-11T14:20:03.000+09:00",
              description: "보내시는 고객님으로부터 상품을 인수받았습니다",
              status: {
                code: "AT_PICKUP",
                name: "집화처리"
              }
            }
          },
          {
            node: {
              time: "2025-08-11T20:43:13.000+09:00",
              description: "물류터미널로 상품이 이동중입니다.",
              status: {
                code: "IN_TRANSIT",
                name: "간선상차"
              }
            }
          },
          {
            node: {
              time: "2025-08-12T01:21:30.000+09:00",
              description: "배송지역으로 상품이 이동중입니다.",
              status: {
                code: "IN_TRANSIT",
                name: "간선상차"
              }
            }
          },
          {
            node: {
              time: "2025-08-12T07:19:01.000+09:00",
              description:
                "고객님의 상품이 배송지에 도착하였습니다.(배송예정:유동현 010-9149-5225)",
              status: {
                code: "IN_TRANSIT",
                name: "간선하차"
              }
            }
          },
          {
            node: {
              time: "2025-08-12T13:21:12.000+09:00",
              description:
                "고객님의 상품을 배송할 예정입니다.(14~16시)(배송담당:유동현 010-9149-5225)",
              status: {
                code: "OUT_FOR_DELIVERY",
                name: "배송출발"
              }
            }
          },
          {
            node: {
              time: "2025-08-12T14:49:17.000+09:00",
              description:
                "고객님의 상품이 배송완료 되었습니다.(담당사원:유동현 010-9149-5225)",
              status: {
                code: "DELIVERED",
                name: "배송완료"
              }
            }
          }
        ]
      }
    }
  }
};

interface props {
  sampleRequest: ISampleRequest;
}

export function SampleRequestTracking({ sampleRequest }: props) {
  // data.track이 null인 경우 처리
  if (!trackingData.data.track) {
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
            {sampleRequest.nodeData?.shipped.trackingNumber}
          </p>
        </div>
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
