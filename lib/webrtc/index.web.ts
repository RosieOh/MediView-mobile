// 웹 폴백: 이 앱의 영상 진료는 네이티브(모바일) 대상이라 웹에서는 미지원으로 둔다.
// 스텁을 "./index" 가 아니라 "./stub" 에서 가져와야 한다. 웹에서 "./index" 는 이 파일
// (index.web.ts)로 재해석되어 자기 자신을 재-export → 무한 재귀가 발생한다.
export { WEBRTC_AVAILABLE, startConsult, RTCVideo } from "./stub";
export type {
  StartConsultOpts,
  ConsultHandle,
  ConsultStatus,
  StreamLike,
  RTCVideoProps,
} from "./types";
