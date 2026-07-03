import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "@/theme/theme";

export default function RootLayout() {
  const { colors, isDark } = useTheme();
  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.canvas },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="doctor/[id]"
          options={{ presentation: "card", animation: "slide_from_right" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
