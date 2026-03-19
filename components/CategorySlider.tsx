import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Colors } from "@/constants/Colors";
import { Category } from "@/constants/data";

interface CategorySliderProps {
  categories: Category[];
  onPress?: (category: Category) => void;
}

export function CategorySlider({ categories, onPress }: CategorySliderProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.slider}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => onPress?.(cat)}
        >
          <View style={styles.iconWrapper}>
            <Text style={styles.emoji}>{cat.emoji}</Text>
          </View>
          <Text style={styles.name}>{cat.name}</Text>
          <Text style={styles.count}>{cat.count}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  slider: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 12,
    paddingBottom: 4,
    paddingHorizontal: 2,
  },
  card: {
    width: 110,
    backgroundColor: Colors.bg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emoji: { fontSize: 26 },
  name: { fontSize: 13, fontWeight: "600", color: Colors.text, textAlign: "center" },
  count: { fontSize: 11, color: Colors.textSecondary, marginTop: 2, textAlign: "center" },
});
