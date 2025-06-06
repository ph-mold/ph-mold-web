import { IInquiry } from "@/types/api/inquiry";

export const MOCK_INQUIRIES: IInquiry[] = [
  {
    id: 1,
    name: "홍길동",
    company: "(주) 테스트",
    email: "test@example.com",
    phone: "010-1234-5678",
    address: "서울특별시 강남구",
    detailedAddress: "테헤란로 123",
    remarks: "샘플 문의입니다",
    status: "PENDING",
    password: "1234",
    createdAt: "2024-03-20",
    agree: true
  },
  {
    id: 2,
    name: "김철수",
    company: "개발회사",
    email: "kim@example.com",
    phone: "010-9876-5432",
    address: "서울특별시 서초구 서초대로 789",
    detailedAddress: "",
    remarks: "",
    status: "IN_PROGRESS",
    password: "4321",
    createdAt: "2024-03-19T15:30:00Z",
    agree: true
  },
  {
    id: 3,
    name: "이영희",
    company: "플라스틱 산업",
    email: "lee.yh@plastic.com",
    phone: "010-2222-3333",
    address: "경기도 수원시 영통구",
    detailedAddress: "광교로 456",
    remarks: "견적 문의드립니다",
    status: "PENDING",
    password: "5678",
    createdAt: "2024-03-18T10:15:00Z",
    agree: true
  },
  {
    id: 4,
    name: "박민수",
    company: "금형기술(주)",
    email: "parks@mold.co.kr",
    phone: "010-4444-5555",
    address: "인천광역시 남동구",
    detailedAddress: "남동대로 789",
    remarks: "기술 상담 요청",
    status: "COMPLETED",
    password: "9012",
    createdAt: "2024-03-17T09:30:00Z",
    agree: true
  },
  {
    id: 5,
    name: "정다운",
    company: "신소재 개발",
    email: "jung@newmat.com",
    phone: "010-6666-7777",
    address: "대전광역시 유성구",
    detailedAddress: "대학로 123",
    remarks: "신규 프로젝트 협의",
    status: "IN_PROGRESS",
    password: "3456",
    createdAt: "2024-03-16T14:20:00Z",
    agree: true
  },
  {
    id: 6,
    name: "최준호",
    company: "자동차부품(주)",
    email: "choi@autoparts.com",
    phone: "010-8888-9999",
    address: "울산광역시 북구",
    detailedAddress: "산업로 567",
    remarks: "자동차 부품 금형 문의",
    status: "PENDING",
    password: "7890",
    createdAt: "2024-03-15T11:45:00Z",
    agree: true
  },
  {
    id: 7,
    name: "강미래",
    company: "미래전자",
    email: "kang@future.co.kr",
    phone: "010-1111-2222",
    address: "경기도 화성시",
    detailedAddress: "동탄대로 890",
    remarks: "전자부품 금형 상담",
    status: "COMPLETED",
    password: "2345",
    createdAt: "2024-03-14T16:10:00Z",
    agree: true
  },
  {
    id: 8,
    name: "송태우",
    company: "정밀기계(주)",
    email: "song@precision.com",
    phone: "010-3333-4444",
    address: "부산광역시 강서구",
    detailedAddress: "녹산산단로 234",
    remarks: "정밀 부품 문의",
    status: "IN_PROGRESS",
    password: "6789",
    createdAt: "2024-03-13T13:25:00Z",
    agree: true
  },
  {
    id: 9,
    name: "임수진",
    company: "바이오텍",
    email: "lim@biotech.com",
    phone: "010-5555-6666",
    address: "대구광역시 달서구",
    detailedAddress: "첨단로 345",
    remarks: "의료기기 부품 상담",
    status: "PENDING",
    password: "0123",
    createdAt: "2024-03-12T10:50:00Z",
    agree: true
  },
  {
    id: 10,
    name: "한승우",
    company: "그린에너지",
    email: "han@green.co.kr",
    phone: "010-7777-8888",
    address: "광주광역시 북구",
    detailedAddress: "첨단과기로 678",
    remarks: "신재생에너지 부품 문의",
    status: "IN_PROGRESS",
    password: "4567",
    createdAt: "2024-03-11T15:40:00Z",
    agree: true
  },
  {
    id: 11,
    name: "오민지",
    company: "스마트솔루션",
    email: "oh@smart.com",
    phone: "010-9999-0000",
    address: "경기도 성남시 분당구",
    detailedAddress: "판교로 901",
    remarks: "IoT 디바이스 케이스 문의",
    status: "PENDING",
    password: "8901",
    createdAt: "2024-03-10T09:15:00Z",
    agree: true
  },
  {
    id: 12,
    name: "윤서연",
    company: "메디칼시스템",
    email: "yoon@medical.co.kr",
    phone: "010-2345-6789",
    address: "강원도 원주시",
    detailedAddress: "의료기기단지로 123",
    remarks: "의료기기 부품 금형 상담",
    status: "COMPLETED",
    password: "2345",
    createdAt: "2024-03-09T14:30:00Z",
    agree: true
  }
];

/**
 * 문의 상태에 따른 UI 표시 설정
 */
export const STATUS_MAP = {
  PENDING: { label: "대기중", color: "text-yellow-600 bg-yellow-100" },
  IN_PROGRESS: { label: "처리중", color: "text-yellow-600 bg-yellow-100" },
  COMPLETED: { label: "답변완료", color: "text-green-600 bg-green-100" }
} as const;
