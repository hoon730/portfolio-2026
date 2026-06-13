// vanholtz 풍의 묵직한 등장 이징 (easeOutExpo 계열)
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

// 마스크 슬라이드 reveal 기본 트랜지션
export const revealTransition = {
  duration: 0.9,
  ease: EASE_OUT_EXPO,
};
