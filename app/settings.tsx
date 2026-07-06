import { useState } from "react";
import { View, Switch, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "@/components/Header";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { useTheme } from "@/theme/theme";
import { palette } from "@/theme/tokens";
import { deleteMe } from "@/api/users";
import { useAuth } from "@/context/AuthContext";

type ToggleRow = { icon: keyof typeof Ionicons.glyphMap; label: string; desc?: string };

const groups: { title: string; rows: ToggleRow[] }[] = [
  {
    title: "알림",
    rows: [
      { icon: "notifications-outline", label: "진료 알림", desc: "예약·진료 시작 알림" },
      { icon: "card-outline", label: "결제 알림" },
      { icon: "megaphone-outline", label: "마케팅 정보 수신" },
    ],
  },
  {
    title: "보안",
    rows: [
      { icon: "finger-print-outline", label: "생체 인증 잠금", desc: "앱 실행 시 Face/Touch ID" },
      { icon: "eye-off-outline", label: "민감정보 가리기" },
    ],
  },
];

export default function Settings() {
  const { colors, spacing, radius } = useTheme();
  const router = useRouter();
  const { logout } = useAuth();
  const [on, setOn] = useState<Record<string, boolean>>({
    "진료 알림": true,
    "결제 알림": true,
    "생체 인증 잠금": true,
  });
  const [withdrawing, setWithdrawing] = useState(false);

  const doWithdraw = async () => {
    setWithdrawing(true);
    try {
      await deleteMe();
      await logout();
      router.replace("/(auth)/login");
    } catch (e) {
      Alert.alert(
        "회원탈퇴 실패",
        e instanceof Error ? e.message : "잠시 후 다시 시도해 주세요.",
      );
    } finally {
      setWithdrawing(false);
    }
  };

  const confirmWithdraw = () => {
    Alert.alert(
      "회원탈퇴",
      "탈퇴하면 진료 내역과 개인정보가 삭제되며 복구할 수 없습니다. 계속하시겠어요?",
      [
        { text: "취소", style: "cancel" },
        { text: "탈퇴하기", style: "destructive", onPress: doWithdraw },
      ],
    );
  };

  const legalRows: { label: string; type: "terms" | "privacy" }[] = [
    { label: "이용약관", type: "terms" },
    { label: "개인정보처리방침", type: "privacy" },
  ];

  return (
    <>
      <Header title="설정" />
      <Screen>
        {groups.map((g) => (
          <View key={g.title} style={{ marginBottom: spacing.x6 }}>
            <Text variant="overline" color="subtle" style={{ marginBottom: spacing.x3 }}>
              {g.title}
            </Text>
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: radius.lg,
                borderWidth: 1,
                borderColor: colors.line,
                overflow: "hidden",
              }}
            >
              {g.rows.map((r, i) => (
                <View
                  key={r.label}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderTopWidth: i === 0 ? 0 : 1,
                    borderTopColor: colors.line,
                  }}
                >
                  <Ionicons name={r.icon} size={20} color={colors.muted} />
                  <View style={{ flex: 1 }}>
                    <Text variant="body">{r.label}</Text>
                    {r.desc ? (
                      <Text variant="caption" color="subtle">
                        {r.desc}
                      </Text>
                    ) : null}
                  </View>
                  <Switch
                    value={!!on[r.label]}
                    onValueChange={(v) => setOn((s) => ({ ...s, [r.label]: v }))}
                    trackColor={{ true: colors.brand, false: colors.line }}
                    thumbColor={palette.white}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* 약관 · 정책 */}
        <View style={{ marginBottom: spacing.x6 }}>
          <Text variant="overline" color="subtle" style={{ marginBottom: spacing.x3 }}>
            약관 · 정책
          </Text>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: radius.lg,
              borderWidth: 1,
              borderColor: colors.line,
              overflow: "hidden",
            }}
          >
            {legalRows.map((r, i) => (
              <Pressable
                key={r.type}
                onPress={() => router.push(`/legal/${r.type}`)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 15,
                  borderTopWidth: i === 0 ? 0 : 1,
                  borderTopColor: colors.line,
                  backgroundColor: pressed ? colors.surface2 : "transparent",
                })}
              >
                <Ionicons name="document-text-outline" size={20} color={colors.muted} />
                <Text variant="body" style={{ flex: 1 }}>
                  {r.label}
                </Text>
                <Ionicons name="chevron-forward" size={18} color={colors.subtle} />
              </Pressable>
            ))}
          </View>
        </View>

        {/* 계정 */}
        <View style={{ marginBottom: spacing.x6 }}>
          <Text variant="overline" color="subtle" style={{ marginBottom: spacing.x3 }}>
            계정
          </Text>
          <Pressable
            onPress={confirmWithdraw}
            disabled={withdrawing}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              paddingHorizontal: 16,
              paddingVertical: 15,
              backgroundColor: pressed ? colors.surface2 : colors.surface,
              borderRadius: radius.lg,
              borderWidth: 1,
              borderColor: colors.line,
              opacity: withdrawing ? 0.6 : 1,
            })}
          >
            <Ionicons name="person-remove-outline" size={20} color={palette.danger} />
            <Text variant="body" style={{ flex: 1, color: palette.danger }}>
              {withdrawing ? "처리 중…" : "회원탈퇴"}
            </Text>
          </Pressable>
        </View>

        <Text variant="caption" color="subtle" center>
          테마는 기기의 라이트/다크 설정을 따릅니다.
        </Text>
      </Screen>
    </>
  );
}
