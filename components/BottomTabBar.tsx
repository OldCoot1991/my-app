import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";

const TAB_ITEMS = [
  { id: "home", label: "Главная", icon: "🏠" },
  { id: "catalog", label: "Каталог", icon: "🗂" },
  { id: "cart", label: "Корзина", icon: "🛒", badge: 2 },
  { id: "profile", label: "Профиль", icon: "👤" },
] as const;

type TabId = (typeof TAB_ITEMS)[number]["id"];

interface BottomTabBarProps {
  active: TabId;
  onPress?: (tabId: TabId) => void;
}

export function BottomTabBar({ active, onPress }: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {TAB_ITEMS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => onPress?.(tab.id)}
          >
            <View style={styles.iconWrapper}>
              <Text style={styles.icon}>{tab.icon}</Text>
              {"badge" in tab && tab.badge ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{tab.badge}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
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
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: Colors.text,
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
