import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { ImagesSource } from "@/assets/images";
import { colors } from "@/styles/colors";

type Message = {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: Date;
};

const initialAIQuestions = [
  "Olá! Sou seu assistente espiritual. Como posso te ajudar hoje?",
  "Que tal conversarmos sobre fé? O que mais te inspira na sua jornada espiritual?",
  "Há alguma passagem bíblica que tem tocado seu coração ultimamente?",
  "Como você tem sentido a presença de Deus em sua vida?",
];

export default function Chat() {
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleGoBack = () => {
    router.back();
  };

  // Initialize chat with AI question
  useEffect(() => {
    const randomQuestion =
      initialAIQuestions[Math.floor(Math.random() * initialAIQuestions.length)];
    const initialMessage: Message = {
      id: "1",
      text: randomQuestion,
      isAI: true,
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, []);

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "Que reflexão interessante! A fé realmente nos fortalece nos momentos difíceis.",
      "Concordo completamente. Deus trabalha de maneiras misteriosas em nossas vidas.",
      "É maravilhoso ver como você está crescendo espiritualmente. Continue nessa jornada!",
      "Essa é uma perspectiva muito sábia. A oração é mesmo um canal poderoso de comunicação.",
      "Obrigado por compartilhar isso comigo. Sua fé é verdadeiramente inspiradora.",
      "Que bela forma de ver as coisas! Deus certamente está guiando seus passos.",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isAI: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI typing and response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        isAI: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isAI ? styles.aiMessageContainer : styles.userMessageContainer,
      ]}
    >
      {message.isAI && (
        <Image source={ImagesSource.mascote} style={styles.aiAvatar} />
      )}
      <View
        style={[
          styles.messageBubbleWrapper,
          message.isAI ? styles.aiMessageBubbleWrapper : styles.userMessageBubbleWrapper,
        ]}
      >
        <BlurView
          intensity={50}
          tint="dark"
          style={[
            styles.messageBubble,
            message.isAI ? styles.aiMessageBubble : styles.userMessageBubble,
          ]}
        >
          <Text style={styles.messageText}>{message.text}</Text>
        </BlurView>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <BlurView
        intensity={80}
        tint="dark"
        style={[styles.header, { paddingTop: top }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleGoBack}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          
          <Image source={ImagesSource.mascote} style={styles.headerAvatar} />
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Claudinho</Text>
            <Text style={styles.headerSubtitle}>
              {isTyping ? "Digitando..." : "Online"}
            </Text>
          </View>
        </View>
      </BlurView>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}

        {isTyping && (
          <View style={[styles.messageContainer, styles.aiMessageContainer]}>
            <Image source={ImagesSource.mascote} style={styles.aiAvatar} />
            <BlurView intensity={50} tint="dark" style={styles.typingIndicator}>
              <Text style={styles.typingText}>●●●</Text>
            </BlurView>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <BlurView
        intensity={80}
        tint="dark"
        style={[styles.inputContainer, { paddingBottom: bottom }]}
      >
        <View style={styles.inputContent}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite sua mensagem..."
            placeholderTextColor={colors.text + "80"}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={styles.sendButtonContainer}
            onPress={handleSendMessage}
            disabled={inputText.trim() === ""}
          >
            <LinearGradient
              colors={
                inputText.trim() === ""
                  ? ["#666", "#444"]
                  : ["#65a83a", "#3b8033"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.sendButton}
            >
              <Text style={styles.sendButtonText}>Enviar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </BlurView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 10,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-end",
  },
  aiMessageContainer: {
    justifyContent: "flex-start",
  },
  userMessageContainer: {
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageBubbleWrapper: {
    maxWidth: "75%",
  },
  aiMessageBubbleWrapper: {
    // No additional styles needed for AI wrapper
  },
  userMessageBubbleWrapper: {
    borderRadius: 20,
    borderBottomRightRadius: 4,
    backgroundColor: "rgba(101, 168, 58, 0.2)",
    borderWidth: 1,
    borderColor: "#65a83a",
    overflow: "hidden",
  },
  messageBubble: {
    borderRadius: 20,
    padding: 12,
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  aiMessageBubble: {
    borderBottomLeftRadius: 4,
  },
  userMessageBubble: {
    borderBottomRightRadius: 4,
    backgroundColor: "transparent",
  },
  messageText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
  },
  typingIndicator: {
    borderRadius: 20,
    padding: 12,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 4,
    overflow: "hidden",
  },
  typingText: {
    fontSize: 16,
    color: colors.text,
    opacity: 0.7,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  inputContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    maxHeight: 100,
    minHeight: 44,
  },
  sendButtonContainer: {
    borderRadius: 22,
    overflow: "hidden",
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 70,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
});
