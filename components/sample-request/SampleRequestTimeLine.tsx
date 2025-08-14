import { Check } from "lucide-react";
import {
  ISampleRequest,
  SampleRequestStatus,
  isStatusCompleted
} from "@/types/api/sample-request";
import { PROCESS_NODES } from "./constants";

interface TimelineNodeProps {
  isCompleted: boolean;
  isActive: boolean;
  statusInfo: (typeof PROCESS_NODES)[0];
}

function TimelineNode({
  isCompleted,
  isActive,
  statusInfo
}: TimelineNodeProps) {
  return (
    <div className="flex flex-col items-center">
      {/* 노드 원형 */}
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 bg-gradient-to-r shadow-sm transition-all duration-200 ${
          isCompleted
            ? `${statusInfo.activeColor} border-reverseForeground`
            : isActive
              ? `bg-background ${statusInfo.completedBorderColor}`
              : "bg-background border-border-strong text-gray-400"
        }`}
      >
        {isCompleted ? (
          <Check size={12} className={`text-reverseForeground`} />
        ) : isActive ? (
          <div className={`scale-75 ${statusInfo.completedTextColor}`}>
            {statusInfo.icon}
          </div>
        ) : (
          <div className="scale-75 text-gray-400">{statusInfo.icon}</div>
        )}
      </div>

      {/* 라벨 */}
      <span
        className={`mt-2 max-w-16 text-center text-xs leading-tight font-medium ${
          isCompleted
            ? `${statusInfo.completedTextColor} font-semibold`
            : isActive
              ? `${statusInfo.completedTextColor} font-semibold`
              : "text-gray-400"
        }`}
      >
        {statusInfo.label}
      </span>
    </div>
  );
}

interface SampleRequestTimelineProps {
  sampleRequest: ISampleRequest;
}

export function SampleRequestTimeline({
  sampleRequest
}: SampleRequestTimelineProps) {
  const currentStatus = sampleRequest.status;
  const completedStatuses = currentStatus
    .split(",")
    .filter(Boolean) as SampleRequestStatus[];

  // 완료된 단계들의 인덱스를 찾아서 연결선 길이 계산
  const getProgressWidth = () => {
    if (completedStatuses.length === 0) return 0;
    if (completedStatuses.includes("completed")) return 100;

    // 마지막 완료된 단계의 인덱스 찾기
    let lastCompletedIndex = -1;
    for (let i = PROCESS_NODES.length - 1; i >= 0; i--) {
      if (completedStatuses.includes(PROCESS_NODES[i].id)) {
        lastCompletedIndex = i;
        break;
      }
    }

    if (lastCompletedIndex === -1) return 0;

    // 8등분 구조에 맞춰 진행률 계산
    // 각 노드는 2등분씩 차지하므로 8등분 중 2등분씩
    const segmentWidth = 100 / 8; // 12.5%씩
    const progress = (lastCompletedIndex + 1) * segmentWidth * 2; // 2등분씩이므로 *2
    return Math.min(progress, 100);
  };

  return (
    <div className="bg-background border-border-strong space-y-4 rounded-lg border shadow-sm">
      <div className="p-4 sm:!p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-foreground text-lg font-semibold">
            샘플 요청 진행 상태
          </h3>
        </div>
        <div className="w-full">
          <div className="relative flex items-center justify-between">
            {/* 연결선 */}
            <div className="bg-border-strong absolute top-3 right-0 left-0 h-1" />

            {/* 완료된 연결선 */}
            {completedStatuses.length > 0 && (
              <div
                className="bg-signature absolute top-3 left-0 h-1 transition-all duration-300"
                style={{
                  width: `${getProgressWidth()}%`
                }}
              />
            )}

            {/* 노드들 */}
            {PROCESS_NODES.map((statusInfo, index) => {
              const isCompleted = isStatusCompleted(
                currentStatus,
                statusInfo.id
              );

              // 현재 진행 중인 단계 계산
              let isActive = false;
              if (!isCompleted) {
                // 완료되지 않은 단계 중에서 첫 번째가 현재 진행 중
                const completedCount = completedStatuses.length;
                isActive = index === completedCount;
              }

              return (
                <div
                  key={statusInfo.id}
                  className="relative z-2 flex flex-1 justify-center"
                >
                  <TimelineNode
                    isCompleted={isCompleted}
                    isActive={isActive}
                    statusInfo={statusInfo}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
