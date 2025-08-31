import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { ImagesSource } from "@/assets/images";
import { colors } from "@/styles/colors";

export function QuizModal() {
  return (
    <Modal visible transparent>
      <View style={styles.container}>
        <View style={{ width: 300 }}>
          <View style={{ position: "relative" }}>
            <Image source={ImagesSource.mascote} style={styles.mascote} />
            <BlurView intensity={50} tint="dark" style={styles.card}>
              <Text style={styles.question}>
                Quais animais tinha na arca de Noé?
              </Text>

              <View style={{ gap: 8, width: "100%" }}>
                <TouchableOpacity>
                  <BlurView intensity={50} tint="dark" style={styles.button}>
                    <Text style={styles.buttonText}>5</Text>
                  </BlurView>
                </TouchableOpacity>

                <TouchableOpacity>
                  <BlurView intensity={50} tint="dark" style={styles.button}>
                    <Text style={styles.buttonText}>65</Text>
                  </BlurView>
                </TouchableOpacity>

                <TouchableOpacity>
                  <BlurView intensity={50} tint="dark" style={styles.button}>
                    <Text style={styles.buttonText}>10</Text>
                  </BlurView>
                </TouchableOpacity>

                <TouchableOpacity>
                  <BlurView intensity={50} tint="dark" style={styles.button}>
                    <Text style={styles.buttonText}>12</Text>
                  </BlurView>
                </TouchableOpacity>

                <Text
                  style={{
                    textAlign: "center",
                    color: colors.text,
                    marginTop: 24,
                    opacity: 0.8,
                  }}
                >
                  1/4
                </Text>
              </View>
            </BlurView>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonResponderContainer}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#65a83a", "#3b8033"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.buttonResponder}
              >
                <Text style={styles.buttonResponderText}>Responder</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 16,
    alignItems: "center",
    overflow: "hidden",
    padding: 24,
    paddingTop: 60,
    minHeight: 200,
    gap: 32,
  },
  button: {
    borderRadius: 80,
    padding: 12,
    overflow: "hidden",
  },
  buttonText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonResponderContainer: {
    borderRadius: 80,
    marginTop: 16,
    overflow: "hidden",
  },
  buttonResponder: {
    padding: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonResponderText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.text,
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
});
