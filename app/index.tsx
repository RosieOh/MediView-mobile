import { ScrollView, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme/theme";
import { palette } from "@/theme/tokens";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export default function Home() {
  const { colors, spacing, radius } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: colors.canvas }}
      contentContainerStyle={{
        paddingTop: insets.top + spacing.x4,
        paddingBottom: insets.bottom + spacing.x10,
        paddingHorizontal: spacing.x5,
        gap: spacing.x6,
      }}
    >
      {/* 브랜드 */}
      <View style={styles.brandRow}>
        <View style={styles.brandRow}>
          <Ionicons name="shield-checkmark" size={22} color={colors.brand} />
          <Text variant="h3">
            Medi<Text variant="h3" color="brand">View</Text>
          </Text>
        </View>
        <Ionicons name="person-circle-outline" size={28} color={colors.muted} />
      </View>

      {/* Hero */}
      <View style={{ gap: spacing.x3, marginTop: spacing.x2 }}>
        <Text variant="overline" color="brandInk">
          비대면 진료, 다시 설계하다
        </Text>
        <Text variant="display">
          집에서 만나는{"\n"}
          <Text variant="display" color="brand">
            믿을 수 있는
          </Text>{" "}
          진료
        </Text>
        <Text variant="body" color="muted" style={{ maxWidth: 320 }}>
          본인확인·의료진 검증·기록 암호화까지. 안전을 처음부터 설계에
          담았습니다.
        </Text>
      </View>

      {/* 신뢰 칩 */}
      <View style={styles.chips}>
        {[
          { icon: "card-outline", label: "본인확인" },
          { icon: "ribbon-outline", label: "면허 검증" },
          { icon: "lock-closed-outline", label: "암호화" },
        ].map((c) => (
          <View
            key={c.label}
            style={[
              styles.chip,
              { backgroundColor: colors.surface, borderColor: colors.line },
            ]}
          >
            <Ionicons name={c.icon as never} size={16} color={colors.brand} />
            <Text variant="small" color="muted">
              {c.label}
            </Text>
          </View>
        ))}
      </View>

      {/* 진료 프리뷰 카드 */}
      <View
        style={[
          styles.consultCard,
          { backgroundColor: palette.primary[700], borderRadius: radius.xl },
        ]}
      >
        <View style={styles.rowBetween}>
          <View style={styles.liveTag}>
            <View style={styles.liveDot} />
            <Text variant="caption" style={{ color: "#fff" }}>
              진료 중
            </Text>
          </View>
          <Ionicons name="videocam" size={20} color="rgba(255,255,255,0.9)" />
        </View>

        <View style={[styles.rowBetween, { marginTop: spacing.x4 }]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={styles.avatar}>
              <Text variant="bodyStrong" style={{ color: "#fff" }}>
                김
              </Text>
            </View>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Text variant="bodyStrong" style={{ color: "#fff" }}>
                  김서연 내과 전문의
                </Text>
                <Ionicons
                  name="shield-checkmark"
                  size={15}
                  color={palette.accent[400]}
                />
              </View>
              <Text variant="caption" style={{ color: "rgba(255,255,255,0.7)" }}>
                비대면 진료 · 04:12
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.summaryPill}>
          <Ionicons name="pulse" size={18} color={palette.accent[400]} />
          <Text variant="small" style={{ color: "rgba(255,255,255,0.9)" }}>
            실시간 문진 요약 생성 중…
          </Text>
        </View>
      </View>

      {/* 요약 카드 */}
      <Card style={{ gap: spacing.x3 }}>
        {[
          { k: "본인확인", v: "완료", ok: true },
          { k: "처방전 발급", v: "검토 중", ok: false },
          { k: "결제(간편)", v: "12,000원", ok: true },
        ].map((r) => (
          <View
            key={r.k}
            style={[
              styles.summaryRow,
              { backgroundColor: colors.surface2, borderRadius: radius.md },
            ]}
          >
            <Text variant="small" color="muted">
              {r.k}
            </Text>
            <Text variant="bodyStrong" color={r.ok ? "brandInk" : "muted"}>
              {r.v}
            </Text>
          </View>
        ))}
      </Card>

      {/* CTA */}
      <Button label="무료로 시작하기" full />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  consultCard: { padding: 20, gap: 4 },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  liveTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.accent[400],
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 16,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
