import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { PRODUCTS } from "@/constants/data";
import { useFavoritesStore } from "@/store/favoritesStore";
import { BottomTabBar } from "@/components/BottomTabBar";
import { StarRating } from "@/components/StarRating";

export default function FavoritesScreen() {
  const router = useRouter();
  const favoriteIds = useFavoritesStore((s) => s.ids);
  const toggle = useFavoritesStore((s) => s.toggle);

  const favoriteProducts = PRODUCTS.filter((p) => favoriteIds.has(p.id));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Избранное</Text>
        {favoriteProducts.length > 0 && (
          <Text style={styles.headerCount}>{favoriteProducts.length} товара</Text>
        )}
      </View>

      {favoriteProducts.length === 0 ? (
        /* EMPTY STATE */
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🤍</Text>
          <Text style={styles.emptyTitle}>Пока пусто</Text>
          <Text style={styles.emptySubtitle}>
            Нажмите ♡ на карточке товара, чтобы добавить его в избранное
          </Text>
          <TouchableOpacity
            style={styles.emptyBtn}
            activeOpacity={0.85}
            onPress={() => router.push("/" as any)}
          >
            <Text style={styles.emptyBtnText}>Перейти к товарам</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {favoriteProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => router.push(`/product/${product.id}` as any)}
            >
              {/* IMAGE */}
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
                {product.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{product.badge}</Text>
                  </View>
                )}
                {/* REMOVE BUTTON */}
                <TouchableOpacity
                  style={styles.removeBtn}
                  activeOpacity={0.75}
                  onPress={() => toggle(product.id)}
                >
                  <Text style={styles.removeIcon}>❤️</Text>
                </TouchableOpacity>
              </View>

              {/* INFO */}
              <View style={styles.info}>
                <View style={styles.topRow}>
                  <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
                  <Text style={styles.price}>{product.price}</Text>
                </View>
                <StarRating rating={product.rating} size={13} />
                <Text style={styles.reviewCount}>{product.reviews} отзывов</Text>
                <Text style={styles.description} numberOfLines={2}>{product.description}</Text>

                {!product.inStock && (
                  <View style={styles.outOfStockTag}>
                    <Text style={styles.outOfStockText}>Нет в наличии</Text>
                  </View>
                )}

                <TouchableOpacity
                  style={[styles.cartBtn, !product.inStock && styles.cartBtnDisabled]}
                  disabled={!product.inStock}
                  activeOpacity={0.85}
                >
                  <Text style={styles.cartBtnText}>
                    {product.inStock ? "🛒  В корзину" : "Нет в наличии"}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <BottomTabBar active="favorites" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 24 },

  // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 22, fontWeight: "800", color: Colors.text, letterSpacing: -0.5 },
  headerCount: { fontSize: 14, color: Colors.textSecondary, fontWeight: "500" },

  // EMPTY STATE
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

  // CARD
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
    overflow: "hidden",
  },
  imageWrapper: { height: 200, backgroundColor: Colors.bg, position: "relative" },
  image: { width: "100%", height: "100%" },
  badge: {
    position: "absolute", top: 12, left: 12,
    backgroundColor: Colors.text, borderRadius: 6,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  badgeText: { color: Colors.white, fontSize: 11, fontWeight: "700" },
  removeBtn: {
    position: "absolute", top: 12, right: 12,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center", justifyContent: "center",
  },
  removeIcon: { fontSize: 18 },
  info: { padding: 16 },
  topRow: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "flex-start", marginBottom: 6, gap: 12,
  },
  name: { fontSize: 15, fontWeight: "700", color: Colors.text, flex: 1, lineHeight: 20 },
  price: { fontSize: 17, fontWeight: "800", color: Colors.text },
  reviewCount: { fontSize: 11, color: Colors.textSecondary, marginTop: 2, marginBottom: 6 },
  description: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18, marginBottom: 10 },
  outOfStockTag: {
    alignSelf: "flex-start",
    backgroundColor: Colors.badgeBg,
    borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 4,
    marginBottom: 10,
  },
  outOfStockText: { color: Colors.textSecondary, fontSize: 12, fontWeight: "500" },
  cartBtn: {
    backgroundColor: Colors.text,
    borderRadius: 12, paddingVertical: 14, alignItems: "center",
  },
  cartBtnDisabled: { backgroundColor: Colors.badgeBg },
  cartBtnText: { color: Colors.white, fontWeight: "700", fontSize: 14 },
});
