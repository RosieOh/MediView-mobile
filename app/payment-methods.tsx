import { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "@/components/Header";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { useTheme } from "@/theme/theme";
import { palette } from "@/theme/tokens";

type Method = { id: string; brand: string; last4: string; primary: boolean };

const initial: Method[] = [
  { id: "m1", brand: "신한카드", last4: "4821", primary: true },
  { id: "m2", brand: "카카오페이", last4: "", primary: false },
];

export default function PaymentMethods() {
  const { colors, spacing, radius } = useTheme();
  const [methods, setMethods] = useState<Method[]>(initial);

  const setPrimary = (id: string) =>
    setMethods((prev) => prev.map((m) => ({ ...m, primary: m.id === id })));

  return (
    <>
      <Header title="결제 수단" />
      <Screen>
        <View style={{ gap: spacing.x3 }}>
          {methods.map((m) => (
            <Card key={m.id} style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
              <View style={[styles.icon, { backgroundColor: palette.primary[50] }]}>
                <Ionicons name="card" size={22} color={colors.brand} />
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">
                  {m.brand}
                  {m.last4 ? ` ····${m.last4}` : ""}
                </Text>
                {m.primary ? (
                  <View style={{ marginTop: 4 }}>
                    <Badge tone="brand" label="기본 결제수단" />
                  </View>
                ) : (
                  <Pressable onPress={() => setPrimary(m.id)}>
                    <Text variant="small" color="brandInk" style={{ marginTop: 4 }}>
                      기본으로 설정
                    </Text>
                  </Pressable>
                )}
              </View>
              <Pressable
                onPress={() => setMethods((prev) => prev.filter((x) => x.id !== m.id))}
                hitSlop={8}
              >
                <Ionicons name="trash-outline" size={20} color={colors.subtle} />
              </Pressable>
            </Card>
          ))}
        </View>

        <Pressable
          onPress={() =>
            setMethods((prev) => [
              ...prev,
              { id: `m${Date.now()}`, brand: "새 카드", last4: "0000", primary: false },
            ])
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: spacing.x4,
            paddingVertical: 16,
            borderRadius: radius.md,
            borderWidth: 1,
            borderStyle: "dashed",
            borderColor: colors.lineStrong,
          }}
        >
          <Ionicons name="add" size={20} color={colors.brand} />
          <Text variant="small" color="brandInk" style={{ fontWeight: "700" }}>
            결제 수단 추가
          </Text>
        </Pressable>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  icon: { width: 46, height: 46, borderRadius: 14, alignItems: "center", justifyContent: "center" },
});
