export function validateEmail(value: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}

export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "");

  // 휴대폰 번호 (010, 011, 016, 017, 018, 019)
  if (digits.startsWith("01")) {
    if (digits.length < 4) return digits;
    if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  }

  // 서울 지역번호 (02)
  if (digits.startsWith("02")) {
    if (digits.length < 3) return digits;
    if (digits.length < 7) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
  }

  // 기타 지역번호 (031, 032, 033, 041, 042, 043, 044, 051, 052, 053, 054, 055, 061, 062, 063, 064)
  if (
    digits.startsWith("03") ||
    digits.startsWith("04") ||
    digits.startsWith("05") ||
    digits.startsWith("06")
  ) {
    if (digits.length < 4) return digits;
    if (digits.length < 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }

  // 기본 포맷 (알 수 없는 형식)
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}

export function validatePhoneNumber(value: string): boolean {
  const digits = value.replace(/\D/g, "");

  // 휴대폰 번호 (010, 011, 016, 017, 018, 019) - 11자리
  if (digits.startsWith("01")) {
    return /^\d{11}$/.test(digits);
  }

  // 서울 지역번호 (02) - 10자리
  if (digits.startsWith("02")) {
    return /^\d{10}$/.test(digits);
  }

  // 기타 지역번호 (031, 032, 033, 041, 042, 043, 044, 051, 052, 053, 054, 055, 061, 062, 063, 064) - 10자리
  if (
    digits.startsWith("03") ||
    digits.startsWith("04") ||
    digits.startsWith("05") ||
    digits.startsWith("06")
  ) {
    return /^\d{10}$/.test(digits);
  }

  // 기본 검사 (휴대폰 번호로 간주)
  return /^\d{11}$/.test(digits);
}
