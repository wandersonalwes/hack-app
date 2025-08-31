import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect } from "react";

import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { ImagesSource } from "@/assets/images";
import { colors } from "@/styles/colors";

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
};

type QuizModalProps = {
  visible: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
};

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Quantos pares de animais Noé levou na arca?",
    options: ["5", "7", "2", "10"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "Quantos dias choveu durante o dilúvio?",
    options: ["30", "40", "50", "60"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Qual foi o primeiro animal que Noé soltou da arca?",
    options: ["Pomba", "Corvo", "Águia", "Pardal"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "O que a pomba trouxe no bico quando voltou?",
    options: ["Fruto", "Ramo de oliveira", "Flor", "Semente"],
    correctAnswer: 1,
  },
];

export function QuizModal({ visible, onClose, onComplete }: QuizModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  // Reset quiz when modal opens
  useEffect(() => {
    if (visible) {
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setScore(0);
      setShowResult(false);
      setAnswered(false);
    }
  }, [visible]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setAnswered(true);

    // Check if answer is correct
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    // Move to next question or show results
    setTimeout(() => {
      if (isLastQuestion) {
        setShowResult(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      }
    }, 1500);
  };

  const handleClose = () => {
    if (showResult) {
      onComplete(score);
    }
    onClose();
  };

  const getAnswerStyle = (answerIndex: number) => {
    if (!answered) {
      return selectedAnswer === answerIndex
        ? styles.buttonSelected
        : styles.button;
    }

    if (answerIndex === currentQuestion.correctAnswer) {
      return styles.buttonCorrect;
    }

    if (
      answerIndex === selectedAnswer &&
      selectedAnswer !== currentQuestion.correctAnswer
    ) {
      return styles.buttonIncorrect;
    }

    return styles.button;
  };
  if (showResult) {
    return (
      <Modal visible={visible} transparent>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={handleClose}
        >
          <View style={styles.container}>
            <TouchableOpacity
              style={{ width: 300 }}
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={{ position: "relative" }}>
                <Image source={ImagesSource.mascote} style={styles.mascote} />
                <BlurView intensity={50} tint="dark" style={styles.card}>
                  <Text style={styles.question}>Quiz Concluído!</Text>
                  <Text
                    style={[styles.question, { fontSize: 16, marginTop: 16 }]}
                  >
                    Você acertou {score} de {quizQuestions.length} questões
                  </Text>
                  <Text style={styles.progressText}>
                    {Math.round((score / quizQuestions.length) * 100)}% de
                    acertos
                  </Text>
                </BlurView>
              </View>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.buttonResponderContainer}
                  activeOpacity={0.8}
                  onPress={handleClose}
                >
                  <LinearGradient
                    colors={["#65a83a", "#3b8033"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.buttonResponder}
                  >
                    <Text style={styles.buttonResponderText}>Finalizar</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={{ width: 300 }}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={{ position: "relative" }}>
              <Image source={ImagesSource.mascote} style={styles.mascote} />
              <BlurView intensity={50} tint="dark" style={styles.card}>
                <Text style={styles.question}>{currentQuestion.question}</Text>

                <View style={{ gap: 8, width: "100%" }}>
                  {currentQuestion.options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleAnswerSelect(index)}
                      disabled={answered}
                    >
                      <BlurView
                        intensity={50}
                        tint="dark"
                        style={getAnswerStyle(index)}
                      >
                        <Text style={styles.buttonText}>{option}</Text>
                      </BlurView>
                    </TouchableOpacity>
                  ))}

                  <Text style={styles.progressText}>
                    {currentQuestionIndex + 1}/{quizQuestions.length}
                  </Text>
                </View>
              </BlurView>
            </View>

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={[
                  styles.buttonResponderContainer,
                  selectedAnswer === null && styles.buttonDisabled,
                ]}
                activeOpacity={0.8}
                onPress={handleSubmitAnswer}
                disabled={selectedAnswer === null || answered}
              >
                <LinearGradient
                  colors={
                    selectedAnswer === null
                      ? ["#666", "#444"]
                      : ["#65a83a", "#3b8033"]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.buttonResponder}
                >
                  <Text style={styles.buttonResponderText}>
                    {answered ? "Próxima" : "Responder"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
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
  buttonSelected: {
    borderRadius: 80,
    padding: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#65a83a",
  },
  buttonCorrect: {
    borderRadius: 80,
    padding: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#4ade80",
    backgroundColor: "rgba(74, 222, 128, 0.2)",
  },
  buttonIncorrect: {
    borderRadius: 80,
    padding: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ef4444",
    backgroundColor: "rgba(239, 68, 68, 0.2)",
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
  buttonDisabled: {
    opacity: 0.5,
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
  progressText: {
    textAlign: "center",
    color: colors.text,
    marginTop: 24,
    opacity: 0.8,
    fontSize: 16,
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
