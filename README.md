# 🧪 PH-MOLD Web

`ph-mold-web`은 (주)팜앤몰드의 웹사이트 **프론트엔드 레포지토리**입니다.  
회사 소개, 제품 카탈로그, 생산설비, 문의 등의 페이지를 포함하며, **SSR 기반 SEO 최적화**를 제공합니다.

## 🔧 Tech Stack

| 영역       | 기술                               |
| ---------- | ---------------------------------- |
| Framework  | Next.js 14+ (App Router 기반)      |
| Language   | TypeScript                         |
| UI         | TailwindCSS + Custom Design System |
| Data Fetch | SWR, fetch API                     |
| SSR        | 지원 (SEO 대응)                    |
| 배포       | Docker + GitHub Actions + Nginx    |

---

## 📁 프로젝트 구조

```
├── app/                        # App Router 기반 페이지 구조
│   └── products/              # 제품 관련 페이지 (탭/서브탭 구조)
│   └── product/              # 제품 디테일 페이지
│   └── layout.tsx            # 공통 레이아웃
│
├── components/                # UI 컴포넌트 모음
│   └── common/               # Button, Typography 등 공통 컴포넌트
│   └── products/             # 제품 관련 컴포넌트
│   └── product/              # 단일 제품 관련 컴포넌트
│
├── lib/                       # 유틸리티 함수 및 fetcher 등
├── hooks/                     # 커스텀 훅
├── context/                   # React Context
├── styles/                    # 글로벌 스타일
├── public/                    # 정적 리소스
```

## 🚀 주요 기능

- ✅ SEO를 고려한 SSR 및 동적 메타데이터 설정 (`generateMetadata`)
- ✅ 메인/서브 카테고리 기반 제품 탐색
- ✅ 제품 상세 페이지 구성 (이미지 갤러리, 스티키 샘플 요청 버튼 등)
- ✅ 스켈레톤 UI 및 로딩 최적화 (지연 렌더링 포함)
- ✅ 모바일/데스크탑 반응형 대응
- ✅ 현재 개발 진행중...

## 🐳 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## ⚙️ 환경변수

.env.local 파일을 프로젝트 루트에 생성하고 다음 값을 설정하세요:

```
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_FILE_SERVER_BASE_URL=
```

## 🏢 About

• 사이트 주소: http://218.148.21.205
