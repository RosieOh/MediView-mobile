import { api } from "@/lib/api";
import { DEMO_MODE } from "@/lib/config";
import type { UserProfile } from "@/lib/types";

export type ProfileUpdate = {
  name?: string;
  phone?: string;
  birthdate?: string;
  gender?: string;
};

export async function updateMe(payload: ProfileUpdate): Promise<Partial<UserProfile>> {
  if (DEMO_MODE) {
    return new Promise((r) => setTimeout(() => r(payload), 500));
  }
  return api<UserProfile>("/api/users/me", { method: "PUT", body: payload });
}

/** 회원탈퇴 — 계정 비활성화(soft delete). 성공 시 세션은 호출 측에서 정리. */
export async function deleteMe(): Promise<void> {
  if (DEMO_MODE) {
    return new Promise((r) => setTimeout(() => r(), 500));
  }
  await api<void>("/api/users/me", { method: "DELETE" });
}
