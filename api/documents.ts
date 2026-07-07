import { api } from "@/lib/api";
import { DEMO_MODE } from "@/lib/config";
import { documents as mockDocs, type MedDocument, type DocType } from "@/lib/mock";

/** 백엔드 MyDocumentResponse */
type MyDoc = {
  id: number;
  type: "SUMMARY" | "CONFIRMATION" | "OPINION" | "PRESCRIPTION" | "MEDICAL_RECORD";
  status: "DRAFT" | "APPROVED" | "ISSUED";
  doctorName?: string;
  organizationName?: string;
  issuedAt?: string;
};

const typeMap: Record<MyDoc["type"], DocType> = {
  SUMMARY: "CONFIRMATION",
  CONFIRMATION: "CONFIRMATION",
  OPINION: "OPINION",
  PRESCRIPTION: "PRESCRIPTION",
  MEDICAL_RECORD: "CONFIRMATION",
};
const titleMap: Record<MyDoc["type"], string> = {
  SUMMARY: "방문요약",
  CONFIRMATION: "진료확인서",
  OPINION: "소견서",
  PRESCRIPTION: "처방전",
  MEDICAL_RECORD: "진료내역서",
};

function toDoc(d: MyDoc): MedDocument {
  return {
    id: String(d.id),
    type: typeMap[d.type] ?? "CONFIRMATION",
    title: titleMap[d.type] ?? "서류",
    doctor: d.doctorName ?? "",
    org: d.organizationName ?? "",
    issuedAt: d.issuedAt
      ? new Date(d.issuedAt).toLocaleDateString("ko-KR", { month: "long", day: "numeric" })
      : "",
    status: d.status === "ISSUED" ? "ISSUED" : "DRAFT",
  };
}

export async function listDocuments(): Promise<MedDocument[]> {
  if (DEMO_MODE) return mockDocs;
  try {
    const list = await api<MyDoc[]>("/api/documents");
    return list.map(toDoc);
  } catch {
    return mockDocs;
  }
}

export async function getDocument(id: string): Promise<MedDocument | null> {
  if (DEMO_MODE) return mockDocs.find((d) => d.id === id) ?? null;
  try {
    const list = await api<MyDoc[]>("/api/documents");
    return list.map(toDoc).find((d) => d.id === id) ?? null;
  } catch {
    return mockDocs.find((d) => d.id === id) ?? null;
  }
}

/** 처방전 본문 구조(백엔드 서식 JSON). */
export type PrescriptionContent = {
  diagnosis?: string;
  drugs: {
    name: string;
    dose?: string;
    freqPerDay?: number;
    days?: number;
    usage?: string;
  }[];
  dispenseDays?: number;
  notes?: string;
};

/** 진료내역서 본문 구조(백엔드 서식 JSON). */
export type MedicalRecordContent = {
  diagnosis?: string;
  visitDate?: string;
  treatment?: string;
  notes?: string;
};

export type IssueDocType = "PRESCRIPTION" | "MEDICAL_RECORD";

/**
 * 의료진이 문서를 발급한다: DRAFT 생성(POST) → 승인(approve)으로 ISSUED 전환.
 * content 는 서식 JSON 을 문자열로 저장한다.
 */
export async function issueDocument(
  appointmentId: string | number,
  type: IssueDocType,
  content: PrescriptionContent | MedicalRecordContent,
): Promise<{ id: number }> {
  if (DEMO_MODE) {
    await new Promise((r) => setTimeout(r, 500));
    return { id: 1 };
  }
  const created = await api<{ id: number }>("/api/documents", {
    method: "POST",
    body: { appointmentId: Number(appointmentId), type, content: JSON.stringify(content) },
  });
  await api(`/api/documents/${created.id}/approve`, { method: "POST" });
  return { id: created.id };
}
