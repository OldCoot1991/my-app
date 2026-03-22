import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useFavoritesStore } from "@/store/favoritesStore";

const TAB_ITEMS = [
  { id: "catalog", label: "Каталог", icon: "🗂", href: "/catalog" },
  { id: "cart", label: "Корзина", icon: "🛒", href: "/cart" },
  { id: "favorites", label: "Избранное", icon: "♡", href: "/favorites" },
  { id: "profile", label: "Профиль", icon: "👤", href: "/auth" },
] as const;

type TabId = (typeof TAB_ITEMS)[number]["id"] | "home";

interface BottomTabBarProps {
  active: TabId;
}

export function BottomTabBar({ active }: BottomTabBarProps) {
  const router = useRouter();
  const favCount = useFavoritesStore((s) => s.count());

  return (
    <View style={styles.tabBar}>
      {TAB_ITEMS.map((tab) => {
        const isActive = tab.id === active;
        const showBadge = tab.id === "favorites" && favCount > 0;

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => router.push(tab.href as any)}
          >
            <View style={styles.iconWrapper}>
              <Text style={[styles.icon, isActive && styles.iconActive]}>
                {tab.id === "favorites" && isActive ? "❤️" : tab.icon}
              </Text>
              {showBadge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{favCount}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
            {isActive && <View style={styles.activeLine} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: 4,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    gap: 3,
    position: "relative",
    paddingBottom: 4,
  },
  iconWrapper: {
    position: "relative",
    width: 44,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 22 },
  iconActive: { fontSize: 22 },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#EF4444",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: { color: Colors.white, fontSize: 9, fontWeight: "700" },
  label: { fontSize: 11, color: Colors.textSecondary, fontWeight: "500" },
  labelActive: { color: Colors.text, fontWeight: "700" },
  activeLine: {
    position: "absolute",
    bottom: -4,
    left: "20%",
    right: "20%",
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.text,
  },
});
