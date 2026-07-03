import { useState } from "react";
import { View, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "@/components/Header";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useTheme } from "@/theme/theme";

type Role = "PATIENT" | "DOCTOR";

export default function Signup() {
  const { spacing, colors, radius } = useTheme();
  const router = useRouter();
  const [role, setRole] = useState<Role>("PATIENT");
  const [form, setForm] = useState({ name: "", email: "", pw: "" });

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Header title="회원가입" />
      <Screen>
        <Text variant="h1" style={{ marginTop: spacing.x2 }}>
          MediView 시작하기
        </Text>
        <Text variant="body" color="muted" style={{ marginTop: 4, marginBottom: spacing.x6 }}>
          몇 가지 정보만 입력하면 돼요.
        </Text>

        {/* 역할 선택 */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.surface2,
            borderRadius: radius.md,
            padding: 4,
            marginBottom: spacing.x5,
          }}
        >
          {(
            [
              { key: "PATIENT", label: "환자", icon: "person-outline" },
              { key: "DOCTOR", label: "의료진", icon: "medkit-outline" },
            ] as const
          ).map((r) => {
            const active = role === r.key;
            return (
              <Pressable
                key={r.key}
                onPress={() => setRole(r.key)}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  gap: 6,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 12,
                  borderRadius: radius.sm,
                  backgroundColor: active ? colors.surface : "transparent",
                }}
              >
                <Ionicons
                  name={r.icon}
                  size={18}
                  color={active ? colors.brand : colors.muted}
                />
                <Text variant="small" color={active ? "content" : "muted"} style={{ fontWeight: "700" }}>
                  {r.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ gap: spacing.x4 }}>
          <Input label="이름" icon="person-outline" placeholder="홍길동" value={form.name} onChangeText={set("name")} />
          <Input
            label="이메일"
            icon="mail-outline"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={set("email")}
          />
          <Input label="비밀번호" icon="lock-closed-outline" placeholder="8자 이상" secure value={form.pw} onChangeText={set("pw")} />
        </View>

        <Text variant="caption" color="subtle" style={{ marginTop: spacing.x4, lineHeight: 18 }}>
          가입 시 이용약관 및 개인정보처리방침에 동의하게 됩니다. 다음 단계에서
          휴대폰 본인확인을 진행합니다.
        </Text>

        <Button
          label="다음: 본인확인"
          full
          onPress={() => router.push("/(auth)/kyc")}
          style={{ marginTop: spacing.x5 }}
        />

        <View style={{ flexDirection: "row", justifyContent: "center", gap: 4, marginTop: spacing.x6 }}>
          <Text variant="small" color="muted">
            이미 계정이 있으신가요?
          </Text>
          <Link href="/(auth)/login" asChild>
            <Pressable>
              <Text variant="small" color="brandInk" style={{ fontWeight: "700" }}>
                로그인
              </Text>
            </Pressable>
          </Link>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}
