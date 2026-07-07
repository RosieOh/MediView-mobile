import { api } from "@/lib/api";
import { DEMO_MODE, WS_URL } from "@/lib/config";
import { getWsTicket } from "./ws";

export type ChatHistoryItem = {
  id: number;
  senderId: number;
  senderName?: string;
  msgType: string;
  content: string;
  createdAt: string;
};

/** 예약에 대한 상담 세션을 조회/생성한다(채팅 진입용). */
export async function getOrCreateSession(appointmentId: string | number): Promise<{ id: number }> {
  if (DEMO_MODE) return { id: Number(appointmentId) || 1 };
  return api<{ id: number }>(`/api/sessions/by-appointment/${appointmentId}?channel=CHAT`, {
    method: "POST",
  });
}

/** 세션 채팅 이력. */
export async function getChatHistory(sessionId: number): Promise<ChatHistoryItem[]> {
  if (DEMO_MODE) return [];
  try {
    return await api<ChatHistoryItem[]>(`/api/sessions/${sessionId}/messages`);
  } catch {
    return [];
  }
}

export type IncomingChat = {
  senderId: number;
  content: string;
  msgType?: string;
  timestamp?: string;
};

export type ChatSocket = {
  send: (content: string) => void;
  close: () => void;
};

/**
 * 채팅 WebSocket 연결. 티켓 발급 후 /ws/chat/{sessionId}?ticket=... 로 접속한다.
 * 서버는 발신자를 포함한 방 전체에 브로드캐스트하므로, 보낸 메시지도 onMessage 로 돌아온다.
 */
export async function connectChat(
  sessionId: number,
  onMessage: (m: IncomingChat) => void,
  onOpen?: () => void,
): Promise<ChatSocket | null> {
  if (DEMO_MODE) return null;
  const ticket = await getWsTicket();
  if (!ticket) return null;

  const url = `${WS_URL}/ws/chat/${sessionId}?ticket=${encodeURIComponent(ticket)}`;
  const ws = new WebSocket(url);
  ws.onopen = () => onOpen?.();
  ws.onmessage = (ev: { data: unknown }) => {
    try {
      const raw = typeof ev.data === "string" ? ev.data : "";
      const data = JSON.parse(raw) as Partial<IncomingChat>;
      if (data && typeof data.content === "string" && typeof data.senderId === "number") {
        onMessage(data as IncomingChat);
      }
    } catch {
      // 파싱 불가 메시지는 무시
    }
  };

  return {
    send: (content: string) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "CHAT", sessionId, msgType: "TEXT", content }));
      }
    },
    close: () => ws.close(),
  };
}
