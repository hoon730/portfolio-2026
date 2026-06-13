export interface CaseStudySection {
  label: string;
  heading: string;
  body: string[];
  list?: string[];
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
  sections: CaseStudySection[];
  takeaway: string;
  next: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "futsalmanager",
    title: "FutsalManager",
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
    next: "futsalmanager",
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
