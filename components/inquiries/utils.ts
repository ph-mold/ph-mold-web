/**
 * 이름 마스킹 처리
 * 예시: "홍길동" -> "홍*동"
 */
export const maskName = (name: string) => {
  if (name.length <= 2) return name[0] + "*";
  return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
};

/**
 * 회사명 마스킹 처리
 * 예시: "(주)회사이름" -> "(주) 회**름"
 */
export const maskCompany = (company: string) => {
  if (company.length <= 2) return company[0] + "*";
  if (company.includes("(주)")) {
    const withoutJu = company.replace("(주)", "").trim();
    return `(주) ${withoutJu[0]}${"*".repeat(withoutJu.length - 2)}${withoutJu[withoutJu.length - 1]}`;
  }
  return (
    company[0] + "*".repeat(company.length - 2) + company[company.length - 1]
  );
};

/**
 * 전화번호 마스킹 처리
 * 예시: "010-1234-5678" -> "010-****-5678"
 */
export const maskPhone = (phone: string) => {
  // 하이픈 제거
  const cleaned = phone.replace(/-/g, "");
  // 패턴에 따라 마스킹
  if (cleaned.length === 11) {
    // 010-xxxx-xxxx
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-****-$3");
  } else if (cleaned.length === 10) {
    // 02-xxxx-xxxx
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "$1-****-$3");
  }
  // 기타 패턴의 경우 기본 마스킹
  return cleaned.replace(/(\d{2,3})(\d{3,4})(\d{4})/, "$1-****-$3");
};
