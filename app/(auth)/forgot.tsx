import { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "@/components/Header";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useTheme } from "@/theme/theme";
import { palette } from "@/theme/tokens";

export default function Forgot() {
  const { spacing, colors } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <>
      <Header title="비밀번호 찾기" />
      <Screen>
        {sent ? (
          <View style={{ alignItems: "center", paddingTop: spacing.x8 }}>
            <View
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                backgroundColor: palette.primary[50],
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="mail-open-outline" size={44} color={colors.brand} />
            </View>
            <Text variant="h1" center style={{ marginTop: spacing.x5 }}>
              메일을 확인하세요
            </Text>
            <Text variant="body" color="muted" center style={{ marginTop: 8, maxWidth: 300 }}>
              {email || "입력하신 이메일"} 로 비밀번호 재설정 링크를 보냈어요.
            </Text>
            <Button label="로그인으로 돌아가기" full onPress={() => router.replace("/(auth)/login")} style={{ marginTop: spacing.x8 }} />
          </View>
        ) : (
          <>
            <Text variant="h1" style={{ marginTop: spacing.x2 }}>
              비밀번호를 잊으셨나요?
            </Text>
            <Text variant="body" color="muted" style={{ marginTop: 4, marginBottom: spacing.x6 }}>
              가입하신 이메일로 재설정 링크를 보내드려요.
            </Text>
            <Input
              label="이메일"
              icon="mail-outline"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="you@example.com"
            />
            <Button label="재설정 링크 받기" full onPress={() => setSent(true)} style={{ marginTop: spacing.x6 }} />
          </>
        )}
      </Screen>
    </>
  );
}
