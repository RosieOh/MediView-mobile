import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { Card } from "@/components/Card";
import { Badge, type Tone } from "@/components/Badge";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { useTheme } from "@/theme/theme";
import { appointments, statusLabel, type AppointmentStatus } from "@/lib/mock";

const toneByStatus: Record<AppointmentStatus, Tone> = {
  SCHEDULED: "brand",
  WAITING: "warning",
  IN_PROGRESS: "success",
  COMPLETED: "neutral",
};

export default function Appointments() {
  const { spacing, colors } = useTheme();
  const router = useRouter();
  const upcoming = appointments.filter((a) => a.status !== "COMPLETED");
  const past = appointments.filter((a) => a.status === "COMPLETED");

  return (
    <Screen title="예약">
      <Text variant="h3" style={{ marginBottom: spacing.x3 }}>
        예정된 진료
      </Text>
      {upcoming.length ? (
        <View style={{ gap: spacing.x3 }}>
          {upcoming.map((a) => (
            <Card key={a.id}>
              <View style={styles.rowBetween}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <Avatar name={a.doctor} />
                  <View>
                    <Text variant="bodyStrong">{a.doctor} 의료진</Text>
                    <Text variant="small" color="muted">
                      {a.specialty} · {a.when}
                    </Text>
                  </View>
                </View>
                <Badge tone={toneByStatus[a.status]} label={statusLabel[a.status]} />
              </View>
              <View style={{ flexDirection: "row", gap: 8, marginTop: spacing.x4 }}>
                <Button
                  label="진료실 입장"
                  style={{ flex: 1 }}
                  onPress={() => router.push("/consult/1")}
                />
                <Button label="변경" variant="secondary" style={{ flex: 1 }} />
              </View>
            </Card>
          ))}
        </View>
      ) : (
        <EmptyState />
      )}

      <Text variant="h3" style={{ marginTop: spacing.x8, marginBottom: spacing.x3 }}>
        지난 진료
      </Text>
      <View style={{ gap: spacing.x3 }}>
        {past.map((a) => (
          <Card key={a.id}>
            <View style={styles.rowBetween}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Avatar name={a.doctor} />
                <View>
                  <Text variant="bodyStrong">{a.doctor} 의료진</Text>
                  <Text variant="small" color="muted">
                    {a.specialty} · {a.when}
                  </Text>
                </View>
              </View>
              <Ionicons name="document-text-outline" size={22} color={colors.subtle} />
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

function EmptyState() {
  const { colors } = useTheme();
  return (
    <Card style={{ alignItems: "center", paddingVertical: 32, gap: 8 }}>
      <Ionicons name="calendar-outline" size={32} color={colors.subtle} />
      <Text variant="body" color="muted">
        예정된 진료가 없어요.
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
