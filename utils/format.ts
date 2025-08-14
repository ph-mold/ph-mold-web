/**
 * 한국어(ko-KR) 사용자에게 보기 좋은 날짜‧시간 문자열을 돌려줍니다.
 *  - "2024-05-28 13:42" 처럼 초(秒)는 제외
 *  - ISO 문자열 형식의 UTC 시간을 파싱
 */
export function formatKoreanDateTime(dateInput: string): string {
  // ISO 문자열을 직접 파싱 (예: "2024-03-28T13:42:00Z")
  const [date, timeWithZ] = dateInput.split("T");
  const time = timeWithZ.split(".")[0]; // 밀리초 부분 제거
  const [hours, minutes] = time.split(":");

  // "2024-03-28 13:42" 형식으로 반환
  return `${date} ${hours}:${minutes}`;
}

// 날짜 포맷팅 함수
export function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours < 12 ? "오전" : "오후";
  const displayHours = hours < 12 ? hours : hours - 12;
  const displayMinutes = minutes.toString().padStart(2, "0");

  return {
    date: `${year}년 ${month}월 ${day}일`,
    time: `${ampm} ${displayHours}:${displayMinutes}`
  };
}

export const formatCount = (() => {
  const formatter = new Intl.NumberFormat("ko-KR");

  return (value: number | bigint | string): string =>
    formatter.format(typeof value === "string" ? Number(value) : value);
})();
