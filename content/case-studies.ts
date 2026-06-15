export interface CaseStudyImage {
  src: string;
  alt?: string;
  caption?: string;
  wide?: boolean; // true = full-width, false = half-width pair
}

export interface CaseStudySection {
  label: string;
  heading: string;
  body: string[];
  list?: string[];
  images?: CaseStudyImage[]; // shown below the section text
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  coverImage?: string; // hero image below the title
  sections: CaseStudySection[];
  takeaway: string;
  next: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "futsalmanager",
    title: "Futsal Manager",
    subtitle: "공정한 팀, 운영의 자동화",
    role: "단독 개발 (기획·디자인·프론트·DB)",
    period: "v2.0 · 27명 동호회 중 16명 사용 · 운영 중",
    stack: ["React 19", "TypeScript", "Supabase", "PWA", "Zustand", "Framer Motion"],
    liveUrl: "https://futsalmanager.vercel.app/",
    githubUrl: "https://github.com/hoon730/futsalmanager",
    sections: [
      {
        label: "01 / Problem",
        heading: "매번 같은 문제가 반복됐다",
        body: [
          "풋살 경기 전마다 카카오톡에서 ChatGPT에 15명 이름을 복붙해 팀을 나눴다. 두 가지가 계속 불편했다.",
          "매번 15명 이름을 다시 입력해야 한다. 그리고 전반·후반 멤버가 거의 바뀌지 않는다.",
          "기존 어떤 도구도 풋살 동호회 운영이라는 구체적인 문제를 풀지 않았다. 직접 만들기로 했다.",
        ],
      },
      {
        label: "02 / Process",
        heading: "만들고, 운영하고, 다시 설계했다",
        body: [
          "v1은 인증 없이 누구나 열람·편집할 수 있는 공유 페이지였다. 팀 배정 문제는 풀렸지만 데이터 신뢰성·일정·출석 누적이 안 됐다.",
          "v2에서 인증을 도입하면서 가장 어려운 의사결정을 만났다. 처음엔 '로그인한 사람 = 멤버'로 모델링했다. 27명 중 16명만 가입하자 나머지 11명은 경기에 참석하는데 시스템에서 빠졌다.",
          "설계를 뒤집어 멤버와 계정을 분리했다. 오너·관리자가 멤버를 추가·편집하고, 계정이 있는 사람은 멤버 리스트와 자기를 연동하는 방식. '유저는 항상 가입하지 않는다'는 현실에 맞춘 데이터 모델이었다.",
          "팀 배정은 전반·후반 다른 조합과 GK 분산을 위해 1000번 무작위 시도 후 점수로 평가하는 방식(Monte Carlo)을 썼다. 점수 함수·가중치 설계는 AI 도구 도움을 받았고, 사용자 체감은 즉각적이었다.",
        ],
      },
      {
        label: "03 / Outcome",
        heading: "27명 중 16명이 쓴다",
        body: [
          "채택률 59%. v2 운영 후 일정·투표·출석률 기록이 정착됐다.",
          "멤버들 피드백: \"팀 배정 문제가 너무 잘 해결됐다\", \"동호회 관리가 훨씬 편하다\".",
          "이 프로젝트가 알려준 것: 데이터 모델은 내 가정이 아니라 유저의 실제 행동에 맞춰야 한다. 27명 중 절반 가까이가 모델 밖에 있었다. 깨닫는 가장 빠른 방법은 실제로 사람들 손에 쥐어주고 운영하는 것이었다.",
        ],
      },
    ],
    takeaway:
      "데이터 모델은 내 가정이 아니라 유저의 실제 행동에 맞춰야 한다.",
    next: "aurum",
  },
  {
    slug: "aurum",
    title: "AURUM",
    subtitle: "Babylon.js로 만든 3D 가상 전시",
    role: "올림플래닛 인턴 · 사수 1인 + 본인 2인 팀",
    period: "2025.08 – 09 (인턴 2개월)",
    stack: ["Babylon.js", "TypeScript", "React", "Zustand", "FSD", "Tailwind"],
    liveUrl: "https://guckkastenaurum.web.elypecs.com",
    sections: [
      {
        label: "01 / Context",
        heading: "실제 클라이언트, 실제 팀",
        body: [
          "국카스텐 3집 앨범 3D 파노라마 가상 투어. 사용자가 전시 공간을 탐험하듯 조각상을 클릭·씬 이동하며 음악·작품 설명을 감상하는 인터랙티브 웹 경험.",
          "올림플래닛 인턴 첫 프로젝트. 사수와 2인 팀으로, 내 담당은 로비 씬 + 6개 테마 씬 + 사내 3D 엔진 '트래블러' 패키지 통합이었다.",
        ],
      },
      {
        label: "02 / What I Did",
        heading: "씬 구현과 패키지 통합",
        body: [
          "6개 테마 씬 + 로비 진입 씬을 Babylon.js로 구현했다. 트래블러는 공개 문서가 없는 사내 패키지였다. 코드를 직접 뜯어보며 동작 방식을 파악하고 통합했다.",
          "탭 전환·화면 잠금 시 음악이 자동 일시정지되는 useSmartVisibility 훅을 작성했다. Zustand 슬라이스로 3D 뷰어·플레이어·모달·UI 4개 도메인의 상태 충돌을 정리했다.",
          "팀이 채택한 FSD(Feature-Sliced Design) 규칙 안에서 내 영역을 설계했다. 처음 접하는 아키텍처 패턴이었다.",
        ],
      },
      {
        label: "03 / What Changed in Me",
        heading: "기준이 바뀌었다",
        body: [
          "사수가 코드 리뷰에서 가장 자주 물은 단어는 '왜'였다. 학원은 동작하는 코드가 기준이었지만, 회사는 의도 있는 코드가 기준이었다.",
          "인턴 도중 AURUM 종료 후 LH 백오피스 개발 전 단계 회의에 참여했다. 설계 문서·기능 명세·디자인 시스템이 코드 한 줄 전에 체계적으로 만들어지는 흐름. 이게 가장 큰 충격이었다.",
          "트래블러 패키지를 뜯어보며 처음으로 코드의 화자를 의식했다. '내 코드를 잘 쓰는 능력' 이전에 '남의 코드를 잘 읽는 능력'이 협업의 첫 조건이었다.",
        ],
      },
      {
        label: "04 / Outcome",
        heading: "클라이언트 인수 완료, 운영 중",
        body: [
          "AURUM은 라이브 운영 중이다. 앨범 프로모션 기간 동안 클라이언트에게 인수됐다.",
          "AURUM 종료 후 동일 회사의 LH 백오피스 프로젝트 설계 단계까지 합류했다. 책임 범위가 확장됐다.",
        ],
      },
    ],
    takeaway:
      "학원에서 '동작하는 코드'를 짤 줄 알았다면, 인턴 2개월 동안 '의도 있는 코드'와 '남이 읽을 수 있는 코드'로 기준이 옮겨갔다.",
    next: "aurora",
  },
  {
    slug: "aurora",
    title: "Aurora Plus",
    subtitle: "OTT 콘텐츠 탐색 플랫폼",
    role: "단독 개발",
    period: "2024.11 – 12",
    stack: ["TypeScript", "Recoil", "React-Query", "Styled-Components"],
    liveUrl: "https://auroraplus-3fc8e.web.app",
    sections: [
      {
        label: "01 / Overview",
        heading: "TMDB API 기반 OTT 탐색 서비스",
        body: [
          "TMDB API를 활용하여 영화 및 TV 콘텐츠 정보를 가져오고, 사용자 친화적으로 정리해 보여주는 OTT 플랫폼 프로젝트입니다.",
          "TanStack Query를 사용해 API 데이터를 캐싱·갱신하면서도 비동기 상태 관리를 깔끔하게 처리했고, 장르별 필터링, 메인 콘텐츠 구성에 중점을 두고 작업했습니다.",
        ],
      },
      {
        label: "02 / What I Built",
        heading: "데이터 패칭과 UI 구성",
        body: [
          "TMDB API를 통한 영화·TV 데이터 패칭 및 화면 구성을 담당했습니다. 콘텐츠 카테고리별로 섹션을 구분하고, 각 섹션에서 데이터를 독립적으로 패칭·캐싱하도록 설계했습니다.",
          "React-Query로 데이터 상태 관리 및 캐싱을 최적화했습니다. 동일 데이터를 여러 컴포넌트에서 참조할 때 불필요한 중복 요청 없이 공유되도록 구성했습니다.",
          "장르 필터링과 카테고리별 섹션화된 UI를 구현했습니다. 로딩 상태 및 오류 상황에 따른 사용자 피드백 UI도 함께 설계했습니다.",
        ],
      },
      {
        label: "03 / Challenge",
        heading: "비동기 상태와 UX 피드백",
        body: [
          "외부 API 의존 특성상 로딩·오류 케이스를 세밀하게 처리해야 했습니다. 각 섹션마다 로딩 스켈레톤과 에러 바운더리를 분리 적용해, 한 섹션이 실패해도 전체 페이지가 깨지지 않도록 했습니다.",
          "Recoil로 전역 상태(장르 필터, 검색어)를 관리하면서 React-Query의 서버 상태와 충돌 없이 분리하는 것이 핵심 과제였습니다. 클라이언트 상태(UI 제어)는 Recoil, 서버 데이터는 React-Query로 역할을 명확히 나눴습니다.",
        ],
      },
    ],
    takeaway:
      "서버 상태와 클라이언트 상태를 명확히 분리할 때, 코드 복잡도가 낮아지고 UX 피드백도 자연스럽게 따라온다.",
    next: "instagram",
  },
  {
    slug: "instagram",
    title: "Instagram",
    subtitle: "Firebase 기반 SNS",
    role: "단독 개발",
    period: "2024.09 – 10",
    stack: ["React", "Firebase", "React-Router-Dom", "Styled-Components"],
    liveUrl: "https://ytg-instagram-5th.web.app",
    sections: [
      {
        label: "01 / Overview",
        heading: "실시간 SNS 플랫폼",
        body: [
          "Firebase를 이용해 사용자가 실시간으로 게시물을 업로드하고 관리할 수 있는 SNS 플랫폼을 구현했습니다.",
          "게시물의 CRUD는 Firestore를 활용하여 구현했고, 프로필 페이지에서는 사용자의 업로드 기록과 정보를 볼 수 있도록 설계했습니다. 실시간 반영과 데이터 흐름을 중점으로 구성했습니다.",
        ],
      },
      {
        label: "02 / What I Built",
        heading: "CRUD와 실시간 데이터 흐름",
        body: [
          "게시물 작성·수정·삭제 기능을 Firebase Firestore 기반으로 구현했습니다. 게시물 리스트와 상세 페이지에서 실시간으로 데이터를 확인할 수 있도록 Firestore 실시간 리스너를 연결했습니다.",
          "사용자 프로필 페이지에 업로드한 게시물을 표시하고, Firebase 인증 기반 라우팅으로 미인증 사용자의 접근을 처리했습니다. 반응형 디자인으로 모바일·데스크탑 모두 대응했습니다.",
        ],
      },
      {
        label: "03 / UX Research",
        heading: "사용자 리서치로 찾은 문제",
        body: [
          "실제 사용자 리서치를 기반으로 핵심 UX 문제 두 가지를 식별했습니다. 게시물 업로드 시 이미지를 하나씩만 올릴 수 있어 여러 장을 등록하려면 게시물을 반복 작성해야 했습니다.",
          "게시물 수정 시 기존에 업로드된 이미지를 삭제하거나 교체하는 기능이 없어 수정 자체가 불가능한 경우가 있었습니다. 두 문제 모두 개선해 다중 이미지 등록과 수정 시 이미지 삭제 기능을 구현했습니다.",
        ],
      },
    ],
    takeaway:
      "기능을 '동작하게' 만드는 것과 '실제로 쓸 수 있게' 만드는 것은 다르다. 사용자 리서치가 그 간격을 보여줬다.",
    next: "futsalmanager",
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
