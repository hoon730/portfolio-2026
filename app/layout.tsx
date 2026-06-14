import type { Metadata } from "next";
import { Geist_Mono, Archivo_Black } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ColorModeProvider } from "@/lib/color-mode";
import { SiteShell } from "@/components/site-shell";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Druk Wide (paid) substitute — heavy display face for the giant titles/logo
const archivoBlack = Archivo_Black({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "염동훈 | Frontend Developer",
  description:
    "제품을 운영까지 책임지는 프론트엔드. 유저를 보고 데이터 모델을 다시 쓰고, 왜 이렇게 만들었는지 설명할 수 있는 코드를 씁니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${geistMono.variable} ${archivoBlack.variable}`}>
      {/* night-mode as initial class prevents flash before client JS hydrates */}
      <body className="ultra-mode">
        <ColorModeProvider>
          <SmoothScroll>
            <SiteShell>{children}</SiteShell>
          </SmoothScroll>
        </ColorModeProvider>
      </body>
    </html>
  );
}
