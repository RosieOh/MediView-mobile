# MediView Mobile (Expo / React Native)

비대면 진료 **앱**. Expo(SDK 52) + Expo Router + TypeScript.
디자인 토큰은 [`../design/DESIGN_SYSTEM.md`](../design/DESIGN_SYSTEM.md) 를 단일 원본으로 따르며,
`theme/tokens.ts` 가 웹(`landing/app/globals.css`)과 동일한 팔레트를 미러링한다.

## 실행

```bash
cd mobile
npm install
npx expo start          # QR 스캔(Expo Go) 또는 i/a 로 시뮬레이터
npm run ios | android | web
```

> 실제 구동에는 iOS 시뮬레이터 / Android 에뮬레이터 / Expo Go 앱(실기기)이 필요합니다.

## 구조

```
theme/
  tokens.ts   # 팔레트 · 역할색(light/dark) · spacing · radius · typography · elevation
  theme.ts    # useTheme() — 시스템 라이트/다크 반영
components/
  Text.tsx    # 타이포 스케일 + 역할색 강제 텍스트
  Button.tsx  # pill 버튼(최소 52pt 터치 타깃)
  Card.tsx    # 라운드 + 소프트 elevation 카드
app/
  _layout.tsx # Expo Router 루트(SafeArea · StatusBar)
  index.tsx   # 홈 — 히어로 · 신뢰칩 · 진료 프리뷰 · 요약 · CTA
```

## 디자인 원칙
- 모든 색/타이포/간격은 `useTheme()` 를 통해서만 사용(하드코딩 금지).
- 터치 타깃 ≥ 44pt, 하단 안전영역(`useSafeAreaInsets`) 존중.
- 라이트/다크는 시스템 설정을 자동 반영.
- 폰트: 현재 시스템 폰트. Pretendard 적용 시 `expo-font` 로 로드 후 typography에 `fontFamily` 추가.
