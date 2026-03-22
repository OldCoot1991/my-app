import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Product } from "@/constants/data";
import { StarRating } from "@/components/StarRating";
import { useFavoritesStore } from "@/store/favoritesStore";

interface ProductCardProps {
  item: Product;
}

export function ProductCard({ item }: ProductCardProps) {
  const router = useRouter();
  const isFav = useFavoritesStore((s) => s.isFavorite(item.id));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <View style={styles.card}>
      {/* IMAGE CAROUSEL */}
      <View style={styles.imageWrapper}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ width: "100%", height: "100%" }}
        >
          {(item.images?.length ? item.images : [item.image]).map((img, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.9}
              onPress={() => router.push(`/product/${item.id}` as any)}
              style={{ width: Dimensions.get("window").width - 42 }}
            >
              <Image source={{ uri: img }} style={styles.image} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </ScrollView>
          {item.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          )}
          {!item.inStock && (
            <View style={styles.outOfStockOverlay}>
              <Text style={styles.outOfStockText}>Нет в наличии</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.wishlistBtn}
            activeOpacity={0.75}
            onPress={() => toggle(item.id)}
          >
            <Text style={[styles.wishlistIcon, isFav && styles.wishlistIconActive]}>
              {isFav ? "❤️" : "♡"}
            </Text>
          </TouchableOpacity>
        </View>

      {/* INFO */}
      <View style={styles.info}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push(`/product/${item.id}` as any)}
        >
          <View style={styles.topRow}>
            <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>

          <StarRating rating={item.rating} size={14} />
          <Text style={styles.reviewCount}>{item.reviews} отзывов</Text>

          <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.specsRow}>
          {item.specs.map((spec) => (
            <View key={spec} style={styles.specTag}>
              <Text style={styles.specText}>{spec}</Text>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[styles.cartBtn, !item.inStock && styles.cartBtnDisabled]}
          activeOpacity={0.85}
          disabled={!item.inStock}
        >
          <Text style={styles.cartBtnText}>
            {item.inStock ? "🛒  Добавить в корзину" : "Нет в наличии"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
    overflow: "hidden",
  },
  imageWrapper: {
    height: 220,
    backgroundColor: Colors.bg,
    position: "relative",
  },
  image: { width: "100%", height: "100%" },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: Colors.text,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { color: Colors.white, fontSize: 11, fontWeight: "700" },
  outOfStockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(250,250,250,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  outOfStockText: { color: Colors.text, fontWeight: "700", fontSize: 16 },
  wishlistBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },
  wishlistIcon: { fontSize: 18, color: Colors.textSecondary },
  wishlistIconActive: { color: "#EF4444" },
  info: { padding: 16 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 12,
  },
  name: { fontSize: 16, fontWeight: "700", color: Colors.text, flex: 1, lineHeight: 22 },
  price: { fontSize: 18, fontWeight: "800", color: Colors.text },
  reviewCount: { fontSize: 12, color: Colors.textSecondary, marginTop: 2, marginBottom: 6 },
  description: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18, marginBottom: 10 },
  specsRow: { marginBottom: 12 },
  specTag: {
    backgroundColor: Colors.badgeBg,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
  },
  specText: { color: Colors.badgeText, fontSize: 11, fontWeight: "500" },
  cartBtn: {
    backgroundColor: Colors.text,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  cartBtnDisabled: { backgroundColor: Colors.badgeBg },
  cartBtnText: { color: Colors.white, fontWeight: "700", fontSize: 15 },
});
