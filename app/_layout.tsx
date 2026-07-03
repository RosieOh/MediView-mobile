import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useTheme } from "@/theme/theme";
import { Loading } from "@/components/Loading";
import { ErrorScreen } from "@/components/ErrorScreen";

SplashScreen.preventAutoHideAsync().catch(() => {});

/** Expo Router 전역 에러 바운더리 — 공통 에러 화면으로 폴백. */
export function ErrorBoundary({
  error,
  retry,
}: {
  error: Error;
  retry: () => Promise<void>;
}) {
  return (
    <SafeAreaProvider>
      <ErrorScreen
        message={
          __DEV__ ? error.message : "잠시 후 다시 시도해 주세요."
        }
        onRetry={() => retry()}
      />
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  const { colors, isDark } = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 실제 앱에서는 여기서 토큰 복원·폰트 로드·세션 확인 등을 수행한다.
    const t = setTimeout(async () => {
      setReady(true);
      await SplashScreen.hideAsync().catch(() => {});
    }, 1100);
    return () => clearTimeout(t);
  }, []);

  if (!ready) {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Loading />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.canvas },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
        <Stack.Screen name="onboarding" options={{ animation: "fade" }} />
        <Stack.Screen name="doctor/[id]" />
        <Stack.Screen name="booking/[id]" />
        <Stack.Screen name="intake/[id]" />
        <Stack.Screen name="consult/[id]" options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="summary/[id]" />
        <Stack.Screen name="payment/[id]" options={{ presentation: "modal" }} />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="documents/index" />
        <Stack.Screen name="documents/[id]" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="support" />
      </Stack>
    </SafeAreaProvider>
  );
}
