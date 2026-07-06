// 기본(스텁) 엔트리: 네이티브 모듈이 없는 환경(Expo Go/타입체크)에서 사용된다.
// Metro 는 네이티브에서 index.native.tsx, 웹에서 index.web.ts 를 우선 해석한다.
export { WEBRTC_AVAILABLE, startConsult, RTCVideo } from "./stub";
export type {
  StartConsultOpts,
  ConsultHandle,
  ConsultStatus,
  StreamLike,
  RTCVideoProps,
} from "./types";
