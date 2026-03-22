import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function AuthScreen() {
  const router = useRouter();
  const [login, setLogin] = useState("");

  const handleLogin = () => {
    console.log("Вход:", login);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={styles.backBtnText}>← Назад</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>С возвращением</Text>
          <Text style={styles.subtitle}>Войдите по почте или номеру телефона, чтобы продолжить покупки</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email или Телефон</Text>
            <TextInput
              style={styles.input}
              placeholder="example@mail.com"
              placeholderTextColor={Colors.textSecondary}
              value={login}
              onChangeText={setLogin}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} activeOpacity={0.85} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Войти</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Впервые у нас?</Text>
            <TouchableOpacity onPress={() => router.push("/register")} activeOpacity={0.7}>
              <Text style={styles.registerLink}>Создать аккаунт</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: Colors.bg 
  },
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: "center" 
  },
  backBtn: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    padding: 8,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backBtnText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "700",
  },
  content: {
    backgroundColor: Colors.white,
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.text,
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: Colors.bg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    fontSize: 16,
    color: Colors.text,
  },
  loginBtn: {
    backgroundColor: Colors.text,
    borderRadius: 14,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  loginBtnText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  registerText: {
    color: Colors.textSecondary,
    fontSize: 15,
  },
  registerLink: {
    color: Colors.text,
    fontWeight: "700",
    fontSize: 15,
  },
});
