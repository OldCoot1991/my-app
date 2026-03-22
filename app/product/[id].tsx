import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Colors } from "@/constants/Colors";
import { getProductById } from "@/constants/data";
import { StarRating } from "@/components/StarRating";
import { useFavoritesStore } from "@/store/favoritesStore";

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const isFav = useFavoritesStore((s) => s.isFavorite(id || ""));
  const toggle = useFavoritesStore((s) => s.toggle);

  const product = getProductById(id);

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Товар не найден</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Text style={styles.headerBackIcon}>‹</Text>
          <Text style={styles.headerBackText}>Назад</Text>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerActionBtn} 
            onPress={() => toggle(id || "")}
          >
            <Text style={[styles.headerActionIcon, isFav && styles.headerActionIconActive]}>
              {isFav ? "❤️" : "♡"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerActionBtn}>
            <Text style={styles.headerActionIcon}>⤴</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO IMAGE */}
        <View style={styles.imageWrapper}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={{ width: '100%', height: '100%' }}>
            {(product.images?.length ? product.images : [product.image]).map((img, idx) => (
              <Image key={idx} source={{ uri: img }} style={{ width: Dimensions.get('window').width, height: '100%' }} resizeMode="cover" />
            ))}
          </ScrollView>
          {product.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{product.badge}</Text>
            </View>
          )}
          {!product.inStock && (
            <View style={styles.outOfStockOverlay}>
              <Text style={styles.outOfStockText}>Нет в наличии</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          {/* NAME + RATING */}
          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.ratingRow}>
            <StarRating rating={product.rating} size={18} />
            <Text style={styles.ratingCount}>({product.reviews} отзывов)</Text>
          </View>

          {/* PRICE */}
          <Text style={styles.price}>{product.price}</Text>

          {/* DESCRIPTION */}
          <Text style={styles.longDescription}>{product.longDescription}</Text>

          {/* FEATURES */}
          <Text style={styles.sectionTitle}>Характеристики товара</Text>
          {product.features.map((feature, i) => (
            <View key={i} style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureCheck}>✓</Text>
              </View>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}

          {/* SPECS */}
          <Text style={styles.sectionTitle}>Технические данные</Text>
          <View style={styles.specsGrid}>
            {product.specs.map((spec, i) => (
              <View key={i} style={styles.specTag}>
                <Text style={styles.specText}>{spec}</Text>
              </View>
            ))}
          </View>

          {/* TRUST BADGES */}
          <View style={styles.trustRow}>
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>🚚</Text>
              <Text style={styles.trustLabel}>Бесплатная{"\n"}доставка</Text>
            </View>
            <View style={styles.trustDivider} />
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>🔄</Text>
              <Text style={styles.trustLabel}>Возврат{"\n"}30 дней</Text>
            </View>
            <View style={styles.trustDivider} />
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>🛡️</Text>
              <Text style={styles.trustLabel}>Гарантия{"\n"}2 года</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceBlock}>
          <Text style={styles.bottomPriceLabel}>Цена</Text>
          <Text style={styles.bottomPrice}>{product.price}</Text>
        </View>
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={[styles.addToCartBtn, !product.inStock && styles.btnDisabled]}
            activeOpacity={0.85}
            disabled={!product.inStock}
            onPress={() => Alert.alert("Корзина", `${product.name} добавлен в корзину!`)}
          >
            <Text style={styles.addToCartText}>
              {product.inStock ? "🛒  В корзину" : "Нет в наличии"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buyNowBtn, !product.inStock && styles.btnDisabled]}
            activeOpacity={0.85}
            disabled={!product.inStock}
            onPress={() => Alert.alert("Покупка", "Переход к оформлению заказа...")}
          >
            <Text style={styles.buyNowText}>Купить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 24 },

  // NOT FOUND
  notFound: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16 },
  notFoundText: { fontSize: 18, color: Colors.textSecondary },
  backBtn: { paddingHorizontal: 24, paddingVertical: 12, backgroundColor: Colors.text, borderRadius: 12 },
  backBtnText: { color: Colors.white, fontWeight: "700" },

  // HEADER
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    backgroundColor: Colors.bg,
  },
  headerBack: { flexDirection: "row", alignItems: "center", gap: 4 },
  headerBackIcon: { fontSize: 28, color: Colors.text, lineHeight: 32 },
  headerBackText: { fontSize: 16, color: Colors.text, fontWeight: "500" },
  headerActions: { flexDirection: "row", gap: 4 },
  headerActionBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.badgeBg, alignItems: "center", justifyContent: "center",
  },
  headerActionIcon: { fontSize: 18, color: Colors.text },
  headerActionIconActive: { color: "#EF4444" },

  // IMAGE
  imageWrapper: { width: "100%", height: 320, backgroundColor: Colors.badgeBg, position: "relative" },
  productImage: { width: "100%", height: "100%" },
  badge: {
    position: "absolute", top: 16, left: 16,
    backgroundColor: Colors.text, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5,
  },
  badgeText: { color: Colors.white, fontSize: 12, fontWeight: "700" },
  outOfStockOverlay: {
    ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(250,250,250,0.75)",
    alignItems: "center", justifyContent: "center",
  },
  outOfStockText: { fontSize: 18, fontWeight: "700", color: Colors.text },

  // CONTENT
  content: { padding: 20, gap: 6 },
  productName: {
    fontSize: 28, fontWeight: "800", color: Colors.text,
    letterSpacing: -0.5, lineHeight: 34, marginBottom: 8,
  },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
  ratingCount: { fontSize: 14, color: Colors.textSecondary },
  price: { fontSize: 32, fontWeight: "800", color: Colors.text, marginTop: 4, marginBottom: 16 },
  longDescription: { fontSize: 15, color: Colors.textSecondary, lineHeight: 24, marginBottom: 20 },

  // FEATURES
  sectionTitle: { fontSize: 18, fontWeight: "700", color: Colors.text, marginTop: 16, marginBottom: 12 },
  featureRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 10 },
  featureIcon: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.accentBg,
    alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
  },
  featureCheck: { color: Colors.accent, fontSize: 12, fontWeight: "900" },
  featureText: { fontSize: 14, color: Colors.textSecondary, flex: 1, lineHeight: 20 },

  // SPECS
  specsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 },
  specTag: {
    backgroundColor: Colors.badgeBg, borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: Colors.border,
  },
  specText: { color: Colors.badgeText, fontSize: 13, fontWeight: "500" },

  // TRUST
  trustRow: {
    flexDirection: "row", borderTopWidth: 1,
    borderTopColor: Colors.border, paddingTop: 20, marginTop: 8,
  },
  trustItem: { flex: 1, alignItems: "center", gap: 6 },
  trustIcon: { fontSize: 24 },
  trustLabel: { fontSize: 11, fontWeight: "600", color: Colors.textSecondary, textAlign: "center", lineHeight: 16 },
  trustDivider: { width: 1, backgroundColor: Colors.border, marginVertical: 4 },

  // BOTTOM BAR
  bottomBar: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, paddingVertical: 12,
    borderTopWidth: 1, borderTopColor: Colors.border,
    backgroundColor: Colors.white, gap: 12,
  },
  bottomPriceBlock: { gap: 2 },
  bottomPriceLabel: { fontSize: 11, color: Colors.textSecondary, fontWeight: "500" },
  bottomPrice: { fontSize: 22, fontWeight: "800", color: Colors.text },
  bottomButtons: { flex: 1, flexDirection: "row", gap: 10 },
  addToCartBtn: {
    flex: 1, backgroundColor: Colors.text, borderRadius: 12, paddingVertical: 14, alignItems: "center",
  },
  addToCartText: { color: Colors.white, fontWeight: "700", fontSize: 14 },
  buyNowBtn: {
    flex: 1, backgroundColor: Colors.accent, borderRadius: 12, paddingVertical: 14, alignItems: "center",
  },
  buyNowText: { color: "#09090B", fontWeight: "700", fontSize: 14 },
  btnDisabled: { backgroundColor: Colors.badgeBg },
});
