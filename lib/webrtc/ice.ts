import { api } from "@/lib/api";
import { DEMO_MODE, STUN_URLS } from "@/lib/config";
import type { IceServer } from "./types";

type IceServersResponse = { iceServers: IceServer[]; ttlSeconds: number };

/** 폴백: 공용 STUN 만 사용. */
function fallback(): IceServer[] {
  return [{ urls: STUN_URLS }];
}

/**
 * 통화 시작 직전에 백엔드(GET /api/webrtc/ice)에서 STUN/TURN 서버 목록을 받아온다.
 * TURN 자격증명은 단기(기본 1시간) 발급되므로 매 통화마다 새로 호출한다.
 * 데모 모드/네트워크 실패 시 공용 STUN 으로 폴백해 화상 연결을 시도한다.
 */
export async function fetchIceServers(): Promise<IceServer[]> {
  if (DEMO_MODE) return fallback();
  try {
    const res = await api<IceServersResponse>("/api/webrtc/ice");
    const list = res?.iceServers;
    return Array.isArray(list) && list.length > 0 ? list : fallback();
  } catch {
    return fallback();
  }
}
