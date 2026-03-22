import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { BottomTabBar } from "@/components/BottomTabBar";

export default function CartScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Корзина</Text>
      </View>

      <View style={styles.emptyState}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Ваша корзина пуста</Text>
        <Text style={styles.emptySubtitle}>
          Похоже, вы еще ничего не добавили. Перейдите в каталог, чтобы найти что-нибудь интересное!
        </Text>
        <TouchableOpacity
          style={styles.emptyBtn}
          activeOpacity={0.85}
          onPress={() => router.push("/catalog")}
        >
          <Text style={styles.emptyBtnText}>Перейти в каталог</Text>
        </TouchableOpacity>
      </View>

      <BottomTabBar active="cart" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 22, fontWeight: "800", color: Colors.text, letterSpacing: -0.5 },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    gap: 12,
  },
  emptyIcon: { fontSize: 72, marginBottom: 8 },
  emptyTitle: { fontSize: 22, fontWeight: "800", color: Colors.text, letterSpacing: -0.5 },
  emptySubtitle: {
    fontSize: 14, color: Colors.textSecondary,
    textAlign: "center", lineHeight: 20,
  },
  emptyBtn: {
    marginTop: 8,
    backgroundColor: Colors.text,
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  emptyBtnText: { color: Colors.white, fontWeight: "700", fontSize: 15 },
});
