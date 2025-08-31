import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ImagesSource } from "@/assets/images";
import { colors } from "@/styles/colors";

interface BiblicalVerse {
  id: string;
  verse: string;
  reference: string;
  reflection: string;
}

interface ReadModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

const biblicalVerses: BiblicalVerse[] = [
  {
    id: "1",
    verse:
      "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    reference: "João 3:16",
    reflection:
      "O amor de Deus por nós é incondicional e eterno. Reflita sobre como esse amor transforma sua vida diária.",
  },
  {
    id: "2",
    verse: "Posso todas as coisas naquele que me fortalece.",
    reference: "Filipenses 4:13",
    reflection:
      "A força que precisamos vem de Cristo. Em que área da sua vida você precisa dessa força hoje?",
  },
  {
    id: "3",
    verse: "O Senhor é o meu pastor; nada me faltará.",
    reference: "Salmos 23:1",
    reflection:
      "Deus cuida de nós como um pastor cuida de suas ovelhas. Como você pode confiar mais no cuidado divino?",
  },
  {
    id: "4",
    verse: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.",
    reference: "Salmos 37:5",
    reflection:
      "Entregar nossos planos a Deus requer fé e confiança. Que situação você pode entregar hoje ao Senhor?",
  },
  {
    id: "5",
    verse:
      "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.",
    reference: "Romanos 8:28",
    reflection:
      "Mesmo nas dificuldades, Deus trabalha para o nosso bem. Como você pode ver a mão de Deus em suas circunstâncias?",
  },
];

export function ReadModal({ visible, onClose, onComplete }: ReadModalProps) {
  const { top, bottom } = useSafeAreaInsets();
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentVerse = biblicalVerses[currentVerseIndex];
  const progress = ((currentVerseIndex + 1) / biblicalVerses.length) * 100;

  const handleNext = () => {
    if (currentVerseIndex < biblicalVerses.length - 1) {
      setCurrentVerseIndex(currentVerseIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleComplete = () => {
    onComplete?.();
    handleClose();
  };

  const handleClose = () => {
    setCurrentVerseIndex(0);
    setIsCompleted(false);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={handleClose}>
        <View style={[styles.container]}>
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <BlurView intensity={50} tint="dark" style={styles.card}>
              {/* Mascot */}
              <Image
                source={ImagesSource.mascote}
                style={[styles.mascot, { top: top + 20 }]}
              />

              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[styles.progressFill, { width: `${progress}%` }]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {currentVerseIndex + 1} de {biblicalVerses.length}
                </Text>
              </View>

              {!isCompleted ? (
                <>
                  {/* Verse Content */}
                  <View style={styles.verseContainer}>
                    <Text style={styles.verseText}>"{currentVerse.verse}"</Text>
                    <Text style={styles.referenceText}>
                      {currentVerse.reference}
                    </Text>
                  </View>

                  {/* Reflection */}
                  <View style={styles.reflectionContainer}>
                    <Text style={styles.reflectionTitle}>💭 Reflexão</Text>
                    <Text style={styles.reflectionText}>
                      {currentVerse.reflection}
                    </Text>
                  </View>

                  {/* Next Button */}
                  <TouchableOpacity
                    style={[
                      styles.nextButtonContainer,
                      { bottom: bottom + 20 },
                    ]}
                    activeOpacity={0.8}
                    onPress={handleNext}
                  >
                    <LinearGradient
                      colors={["#65a83a", "#3b8033"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.nextButton}
                    >
                      <Text style={styles.nextButtonText}>
                        {currentVerseIndex < biblicalVerses.length - 1
                          ? "Próximo"
                          : "Finalizar"}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  {/* Completion Screen */}
                  <View style={styles.completionContainer}>
                    <Text style={styles.completionTitle}>🙏 Parabéns!</Text>
                    <Text style={styles.completionText}>
                      Você completou a leitura dos versículos bíblicos.
                    </Text>
                    <Text style={styles.completionSubtext}>
                      Que essas palavras permaneçam em seu coração e guiem seus
                      passos.
                    </Text>
                  </View>

                  {/* Complete Button */}
                  <TouchableOpacity
                    style={styles.nextButtonContainer}
                    activeOpacity={0.8}
                    onPress={handleComplete}
                  >
                    <LinearGradient
                      colors={["#65a83a", "#3b8033"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.nextButton}
                    >
                      <Text style={styles.nextButtonText}>Concluir</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}
            </BlurView>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
  },
  modalContent: {
    flex: 1,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",

    height: Dimensions.get("window").height,

    justifyContent: "space-between",
  },
  mascot: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primaryForeground,
    borderRadius: 4,
  },
  progressText: {
    color: colors.text,
    fontSize: 14,
    opacity: 0.8,
  },
  verseContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  verseText: {
    fontSize: 18,
    color: colors.text,
    textAlign: "center",
    lineHeight: 26,
    fontStyle: "italic",
    marginBottom: 12,
  },
  referenceText: {
    fontSize: 16,
    color: colors.primaryForeground,
    fontWeight: "600",
    textAlign: "center",
  },
  reflectionContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  reflectionTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  reflectionText: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
    lineHeight: 20,
    opacity: 0.9,
  },
  completionContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  completionTitle: {
    fontSize: 24,
    color: colors.text,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  completionText: {
    fontSize: 18,
    color: colors.text,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 12,
  },
  completionSubtext: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
    lineHeight: 20,
    opacity: 0.8,
    fontStyle: "italic",
  },
  nextButtonContainer: {
    borderRadius: 80,
    overflow: "hidden",
    width: "100%",
  },
  nextButton: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
