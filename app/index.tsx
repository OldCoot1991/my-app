import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { Colors } from "@/constants/Colors";
import { PRODUCTS, CATEGORIES } from "@/constants/data";
import { SearchHeader } from "@/components/SearchHeader";
import { BottomTabBar } from "@/components/BottomTabBar";
import { ProductCard } from "@/components/ProductCard";
import { CategorySlider } from "@/components/CategorySlider";

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />

      <SearchHeader
        value={search}
        onChangeText={setSearch}
        placeholder="Найти платы, контроллеры, аксессуары..."
      />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── HERO ─────────────────────────────────── */}
        <View style={styles.hero}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200" }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <View style={styles.heroBadgeDot} />
              <Text style={styles.heroBadgeText}>Новинка: Raspberry Pi 5</Text>
            </View>
            <Text style={styles.heroTitle}>
              Build. Play.{"\n"}
              <Text style={styles.heroTitleAccent}>Relive.</Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              Лучшее место для мейкеров и ретро-геймеров. Одноплатные компьютеры, контроллеры 8BitDo и DIY-наборы.
            </Text>
            <View style={styles.heroButtons}>
              <TouchableOpacity style={styles.heroBtnPrimary} activeOpacity={0.85}>
                <Text style={styles.heroBtnPrimaryText}>Купить платы</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.heroBtnOutline} activeOpacity={0.85}>
                <Text style={styles.heroBtnOutlineText}>Контроллеры →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── CATEGORIES ───────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Категории</Text>
          <CategorySlider categories={CATEGORIES} />
        </View>

        {/* ── FEATURED PRODUCTS ────────────────────── */}
        <View style={[styles.section, styles.sectionGray]}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Популярные товары</Text>
              <Text style={styles.sectionSubtitle}>Лучший выбор для мейкеров и ретро-геймеров</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Все →</Text>
            </TouchableOpacity>
          </View>
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </View>

        {/* ── PROMO BANNER ─────────────────────────── */}
        <View style={styles.promo}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
          <View style={styles.promoOverlay} />
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>
              Ультимативный{"\n"}
              <Text style={styles.promoTitleAccent}>ретро-комплект.</Text>
            </Text>
            <Text style={styles.promoSubtitle}>
              Raspberry Pi 5 + два контроллера 8BitDo SN30 Pro + корпус Argon ONE.{"\n"}Скидка 15%. Всё для вашей аркады.
            </Text>
            <TouchableOpacity style={styles.promoBtn} activeOpacity={0.85}>
              <Text style={styles.promoBtnText}>Купить комплект</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.promoOutlineBtn} activeOpacity={0.85}>
              <Text style={styles.promoOutlineBtnText}>Подробнее →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomTabBar active="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 32 },

  // HERO
  hero: { height: 350, justifyContent: "flex-end", overflow: "hidden" },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(9,9,11,0.65)",
  },
  heroContent: { padding: 20, paddingBottom: 24 },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  heroBadgeDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: Colors.accent, marginRight: 8,
  },
  heroBadgeText: { color: Colors.white, fontSize: 12, fontWeight: "500" },
  heroTitle: {
    fontSize: 34, fontWeight: "800", color: Colors.white,
    letterSpacing: -1, lineHeight: 38, marginBottom: 8,
  },
  heroTitleAccent: { color: "#A1A1AA" },
  heroSubtitle: {
    fontSize: 14, color: "#A1A1AA", lineHeight: 20, marginBottom: 16, maxWidth: 320,
  },
  heroButtons: { flexDirection: "row", gap: 12 },
  heroBtnPrimary: {
    backgroundColor: Colors.white, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 50,
  },
  heroBtnPrimaryText: { color: Colors.text, fontWeight: "700", fontSize: 15 },
  heroBtnOutline: {
    borderWidth: 1, borderColor: "rgba(255,255,255,0.4)",
    paddingHorizontal: 20, paddingVertical: 14, borderRadius: 50,
  },
  heroBtnOutlineText: { color: Colors.white, fontWeight: "600", fontSize: 15 },

  // SECTIONS
  section: { padding: 20, backgroundColor: Colors.white },
  sectionGray: { backgroundColor: Colors.bg },
  sectionHeader: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "flex-start", marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24, fontWeight: "800", color: Colors.text,
    letterSpacing: -0.5, marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13, color: Colors.textSecondary, maxWidth: 220, lineHeight: 18,
  },
  sectionLink: { fontSize: 14, fontWeight: "600", color: Colors.text, paddingTop: 4 },

  // PROMO
  promo: { height: 320, justifyContent: "flex-end", overflow: "hidden" },
  promoOverlay: {
    ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(9,9,11,0.78)",
  },
  promoContent: { padding: 20, paddingBottom: 24 },
  promoTitle: {
    fontSize: 30, fontWeight: "800", color: Colors.white,
    letterSpacing: -1, lineHeight: 36, marginBottom: 8,
  },
  promoTitleAccent: { color: Colors.accent },
  promoSubtitle: { fontSize: 13, color: "#A1A1AA", lineHeight: 20, marginBottom: 16 },
  promoBtn: {
    backgroundColor: Colors.accent, borderRadius: 50,
    paddingVertical: 16, alignItems: "center", marginBottom: 12,
  },
  promoBtnText: { color: "#09090B", fontWeight: "700", fontSize: 16 },
  promoOutlineBtn: {
    borderWidth: 1, borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 50, paddingVertical: 16, alignItems: "center",
  },
  promoOutlineBtnText: { color: Colors.white, fontWeight: "600", fontSize: 16 },
});
