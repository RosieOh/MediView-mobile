import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { DEMO_MODE } from "@/lib/config";
import { registerPushToken } from "@/api/notifications";

// 포그라운드에서도 알림 배너/사운드를 표시한다.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    // shouldShowAlert 는 구버전 호환용(현 타입에서 필수), 배너/리스트는 신 API.
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * 푸시 권한을 요청하고 Expo 푸시 토큰을 서버에 등록한다.
 * - 데모/웹/시뮬레이터/권한거부/EAS 미설정 시 조용히 건너뛴다(앱은 정상 동작).
 */
export async function registerForPush(): Promise<void> {
  if (DEMO_MODE || Platform.OS === "web" || !Device.isDevice) return;

  try {
    const existing = await Notifications.getPermissionsAsync();
    let granted = existing.granted;
    if (!granted && existing.canAskAgain) {
      const req = await Notifications.requestPermissionsAsync();
      granted = req.granted;
    }
    if (!granted) return;

    const projectId =
      (Constants.expoConfig?.extra as { eas?: { projectId?: string } } | undefined)?.eas
        ?.projectId ?? (Constants as { easConfig?: { projectId?: string } }).easConfig?.projectId;

    const tokenResp = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : undefined,
    );
    await registerPushToken(tokenResp.data, Platform.OS);
  } catch {
    // 토큰 획득/등록 실패는 무시
  }
}
