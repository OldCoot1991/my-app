import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface StarRatingProps {
  rating: number;
  size?: number;
}

export function StarRating({ rating, size = 14 }: StarRatingProps) {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text
          key={i}
          style={[
            styles.star,
            {
              fontSize: size,
              color: i <= Math.round(rating) ? Colors.starColor : Colors.border,
            },
          ]}
        >
          ★
        </Text>
      ))}
      <Text style={[styles.value, { fontSize: size - 1 }]}>{rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  star: {
    fontWeight: "600",
  },
  value: {
    fontWeight: "700",
    color: Colors.text,
    marginLeft: 4,
  },
});
