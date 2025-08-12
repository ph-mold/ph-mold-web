// 오류 정보를 위한 인터페이스 정의
interface ErrorInfo {
  message?: string;
  error?: string;
  statusCode?: number;
  [key: string]: unknown;
}

// 확장된 Error 인터페이스
interface ExtendedError extends Error {
  statusCode?: number;
  status?: number;
  info?: ErrorInfo;
}

export const fetcher = async <T>(
  url: string,
  options?: RequestInit & { cacheType?: "no-store" | "force-cache" | "default" }
): Promise<T | undefined> => {
  const cache = options?.cacheType ?? "no-store";
  const res = await fetch(url, { ...options, cache });

  if (!res.ok) {
    // 서버 응답에서 오류 정보 추출
    let errorInfo: ErrorInfo = {};
    try {
      errorInfo = await res.json();
    } catch {
      // JSON 파싱 실패 시 기본 오류 정보 사용
      errorInfo = {
        message: `HTTP ${res.status}: ${res.statusText}`,
        error: res.statusText,
        statusCode: res.status
      };
    }

    // useSWR에서 사용할 수 있는 오류 객체 생성
    const error = new Error(
      errorInfo.message || "An error occurred while fetching the data."
    ) as ExtendedError;

    // useSWR에서 statusCode로 오류 타입을 구분할 수 있도록 속성 추가
    error.statusCode = errorInfo.statusCode || res.status;
    error.status = res.status;
    error.info = errorInfo;

    throw error;
  }

  return res.json();
};
