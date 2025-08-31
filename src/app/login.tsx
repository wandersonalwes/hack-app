import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { ImagesSource } from "@/assets/images";
import { colors } from "@/styles/colors";
import { useAuthStore } from "@/store/auth";

export default function Login() {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const { login, isLoading, isAuthenticated } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect to journey if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/journey");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      Alert.alert("Sucesso", "Login realizado com sucesso!", [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)/journey"),
        },
      ]);
    } else {
      Alert.alert("Erro", "Email ou senha incorretos. Tente: joao@gmail.com / 123");
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Recuperar Senha",
      "Um link de recuperação será enviado para seu email."
    );
  };

  return (
    <>
      <ImageBackground
        source={ImagesSource.splash}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <BlurView tint="dark" intensity={80} style={styles.blurOverlay} />
      </ImageBackground>

      <KeyboardAvoidingView
        style={[styles.container, { paddingTop: top }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <View style={styles.formContainer}>
            <View style={{ position: "relative", width: "100%" }}>
              <Image source={ImagesSource.mascote} style={styles.mascote} />
              <View style={styles.card}>
                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.subtitle}>
                  Entre com sua conta para continuar sua jornada espiritual
                </Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor={colors.text + "80"}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Senha"
                    placeholderTextColor={colors.text + "80"}
                    secureTextEntry
                    autoCapitalize="none"
                  />

                  <TouchableOpacity
                    style={styles.forgotPasswordButton}
                    onPress={handleForgotPassword}
                  >
                    <Text style={styles.forgotPasswordText}>
                      Esqueceu sua senha?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.loginButtonContainer,
                  (!email.trim() || !password.trim() || isLoading) &&
                    styles.buttonDisabled,
                ]}
                activeOpacity={0.8}
                onPress={handleLogin}
                disabled={!email.trim() || !password.trim() || isLoading}
              >
                <LinearGradient
                  colors={
                    !email.trim() || !password.trim() || isLoading
                      ? ["#666", "#444"]
                      : ["#65a83a", "#3b8033"]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginButtonText}>
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Não tem uma conta? </Text>
                <TouchableOpacity>
                  <Text style={styles.signupLink}>Cadastre-se</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
  },
  card: {
    borderRadius: 16,
    alignItems: "center",
    overflow: "hidden",
    paddingTop: 80,
    width: "100%",
    gap: 24,
  },
  mascote: {
    width: 150,
    height: 150,
    position: "absolute",
    top: 0,
    left: 0,
    marginLeft: "50%",
    transform: [{ translateX: -75 }, { translateY: -75 }],
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: colors.text,
    opacity: 0.8,
    lineHeight: 22,
  },
  inputContainer: {
    width: "100%",
    gap: 16,
  },
  input: {
    borderRadius: 80,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  forgotPasswordText: {
    color: colors.primaryForeground,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 24,
    gap: 20,
  },
  loginButtonContainer: {
    borderRadius: 80,
    overflow: "hidden",
    width: "100%",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  loginButton: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  signupText: {
    color: colors.text,
    fontSize: 16,
    opacity: 0.8,
  },
  signupLink: {
    color: colors.primaryForeground,
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  blurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
