export interface Project {
  slug: string;
  number: string;
  title: string;
  /** title split into lines for the giant home list (defaults to [title]) */
  titleLines?: string[];
  subtitle: string;
  category: "selected" | "more";
  role: string;
  period: string;
  metrics?: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "futsalmanager",
    number: "01",
    title: "FutsalManager",
    titleLines: ["Futsal", "Manager"],
    subtitle: "공정한 팀, 운영의 자동화",
    category: "selected",
    role: "단독 개발",
    period: "v2.0 운영 중",
    metrics: "27명 동호회 중 16명 사용 (채택률 59%)",
    stack: ["React 19", "TypeScript", "Supabase", "PWA"],
    liveUrl: "https://futsalmanager.vercel.app/",
    githubUrl: "https://github.com/hoon730/futsalmanager",
  },
  {
    slug: "aurum",
    number: "02",
    title: "AURUM",
    subtitle: "Babylon.js로 만든 3D 가상 전시",
    category: "selected",
    role: "올림플래닛 인턴 · 사수 1인 + 본인 2인 팀",
    period: "2025.08–09 (인턴 2개월)",
    stack: ["Babylon.js", "TypeScript", "Zustand", "FSD"],
    liveUrl: "https://guckkastenaurum.web.elypecs.com",
  },
  {
    slug: "aurora",
    number: "03",
    title: "Aurora Plus",
    titleLines: ["Aurora", "Plus"],
    subtitle: "OTT 콘텐츠 탐색 플랫폼",
    category: "more",
    role: "단독 개발",
    period: "2024.11–12",
    stack: ["TypeScript", "Recoil", "React-Query", "Styled-Components"],
    liveUrl: "https://auroraplus-3fc8e.web.app",
  },
  {
    slug: "instagram",
    number: "04",
    title: "Instagram",
    subtitle: "Firebase 기반 SNS",
    category: "more",
    role: "단독 개발",
    period: "2024.09–10",
    stack: ["React", "Firebase", "React-Router", "Styled-Components"],
    liveUrl: "https://ytg-instagram-5th.web.app",
  },
];

export const selectedWork = projects.filter((p) => p.category === "selected");
export const moreProjects = projects.filter((p) => p.category === "more");
export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
