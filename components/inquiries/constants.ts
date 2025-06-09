/**
 * 문의 상태에 따른 UI 표시 설정
 */
export const STATUS_MAP = {
  PENDING: { label: "대기중", color: "text-yellow-600 bg-yellow-100" },
  IN_PROGRESS: { label: "처리중", color: "text-yellow-600 bg-yellow-100" },
  COMPLETED: { label: "답변완료", color: "text-green-600 bg-green-100" }
} as const;
