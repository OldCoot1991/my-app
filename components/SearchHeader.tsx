import { View, Text, StyleSheet, TextInput } from "react-native";
import { Colors } from "@/constants/Colors";

interface SearchHeaderProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchHeader({
  value,
  onChangeText,
  placeholder = "Поиск товаров...",
}: SearchHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.inputWrapper}>
        <Text style={styles.icon}>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bg,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    height: 50,
    gap: 10,
  },
  icon: { fontSize: 18 },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    paddingVertical: 0,
  },
});
