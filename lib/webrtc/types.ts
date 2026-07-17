import type { ComponentType } from "react";
import type { StyleProp, ViewStyle } from "react-native";

/** 플랫폼별 MediaStream 타입이 달라 any 로 추상화한다. */
export type StreamLike = unknown;

export type ConsultStatus = "connecting" | "waiting" | "connected" | "ended" | "error";

export type ConsultHandle = {
  /** on 을 지정하면 그 값으로, 없으면 토글. 반환값은 '꺼짐(muted/off)' 여부. */
  toggleMic: (on?: boolean) => boolean;
  toggleCam: (on?: boolean) => boolean;
  hangup: () => void;
};

/** RTCIceServer 호환 형태. 백엔드 GET /api/webrtc/ice 응답과 동일하다. */
export type IceServer = {
  urls: string | string[];
  username?: string;
  credential?: string;
};

export type StartConsultOpts = {
  roomId: string;
  wsUrl: string;
  ticket: string | null;
  /** 백엔드에서 발급받은 ICE(STUN/TURN) 서버. 미지정 시 폴백 STUN 사용. */
  iceServers?: IceServer[];
  onLocalStream?: (s: StreamLike) => void;
  onRemoteStream?: (s: StreamLike | null) => void;
  onStatus?: (s: ConsultStatus) => void;
};

export type RTCVideoProps = {
  stream: StreamLike | null;
  style?: StyleProp<ViewStyle>;
  mirror?: boolean;
  objectFit?: "cover" | "contain";
};

export type WebRtcModule = {
  WEBRTC_AVAILABLE: boolean;
  startConsult: (opts: StartConsultOpts) => ConsultHandle;
  RTCVideo: ComponentType<RTCVideoProps>;
};
