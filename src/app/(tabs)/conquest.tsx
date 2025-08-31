import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

import { ImagesSource } from "@/assets/images";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/styles/colors";
import { Container } from "@/components/container";

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  xpReward: number;
  isCompleted: boolean;
};

const achievements: Achievement[] = [
  {
    id: "first_prayer",
    title: "Primeira Oração",
    description: "Complete sua primeira oração diária",
    icon: "heart",
    xpReward: 50,
    isCompleted: true,
  },
  {
    id: "quiz_master",
    title: "Mestre dos Quiz",
    description: "Complete 5 quiz com pontuação perfeita",
    icon: "school",
    xpReward: 200,
    isCompleted: true,
  },
  {
    id: "daily_devotion",
    title: "Devoção Diária",
    description: "Complete 7 dias consecutivos de devoção",
    icon: "book",
    xpReward: 150,
    isCompleted: false,
  },
  {
    id: "helping_hand",
    title: "Mão Amiga",
    description: "Complete 10 missões de ajuda ao próximo",
    icon: "people",
    xpReward: 300,
    isCompleted: true,
  },
  {
    id: "psalm_reader",
    title: "Leitor de Salmos",
    description: "Leia 20 salmos diferentes",
    icon: "library",
    xpReward: 250,
    isCompleted: false,
  },
  {
    id: "faithful_friend",
    title: "Amigo Fiel",
    description: "Ore por 15 pessoas diferentes",
    icon: "heart-circle",
    xpReward: 180,
    isCompleted: true,
  },
  {
    id: "wisdom_seeker",
    title: "Buscador da Sabedoria",
    description: "Complete todos os módulos de fundamentos",
    icon: "trophy",
    xpReward: 500,
    isCompleted: false,
  },
  {
    id: "spiritual_warrior",
    title: "Guerreiro Espiritual",
    description: "Complete 50 missões espirituais",
    icon: "shield",
    xpReward: 1000,
    isCompleted: false,
  },
];

export default function Conquest() {
  const { top, bottom } = useSafeAreaInsets();

  const completedAchievements = achievements.filter(
    (a) => a.isCompleted
  ).length;
  const totalXP = achievements
    .filter((a) => a.isCompleted)
    .reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <Container>
      {/* Background Image */}
      <ImageBackground
        source={ImagesSource.background}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: top + 40, paddingBottom: bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Conquistas</Text>
          <Text style={styles.headerSubtitle}>
            Acompanhe seu progresso espiritual
          </Text>

          {/* Stats Overview */}
          <BlurView intensity={50} tint="dark" style={styles.statsCard}>
            <View style={styles.statsContent}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{completedAchievements}</Text>
                <Text style={styles.statLabel}>Conquistas</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalXP}</Text>
                <Text style={styles.statLabel}>XP Total</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {Math.round(
                    (completedAchievements / achievements.length) * 100
                  )}
                  %
                </Text>
                <Text style={styles.statLabel}>Progresso</Text>
              </View>
            </View>
          </BlurView>
        </View>

        {/* Achievements Grid */}
        <View style={styles.achievementsGrid}>
          {achievements.map((achievement, index) => (
            <View key={achievement.id} style={styles.achievementItem}>
              <BlurView
                intensity={40}
                tint="dark"
                style={[
                  styles.achievementCard,
                  achievement.isCompleted && styles.achievementCardCompleted,
                ]}
              >
                <View style={styles.achievementContent}>
                  {/* Icon */}
                  <View
                    style={[
                      styles.achievementIcon,
                      achievement.isCompleted &&
                        styles.achievementIconCompleted,
                    ]}
                  >
                    <Ionicons
                      name={achievement.icon}
                      size={24}
                      color={achievement.isCompleted ? "#65a83a" : colors.text}
                    />
                  </View>

                  {/* Title */}
                  <Text
                    style={[
                      styles.achievementTitle,
                      achievement.isCompleted &&
                        styles.achievementTitleCompleted,
                    ]}
                  >
                    {achievement.title}
                  </Text>

                  {/* Description */}
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>

                  {/* XP Reward */}
                  <View style={styles.xpContainer}>
                    <Text style={styles.xpText}>
                      +{achievement.xpReward} XP
                    </Text>
                  </View>

                  {/* Completion Check */}
                  {achievement.isCompleted && (
                    <View style={styles.completionBadge}>
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#65a83a"
                      />
                    </View>
                  )}
                </View>
              </BlurView>
            </View>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  backgroundImage: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,

    opacity: 0.3,
  },
  headerSection: {
    marginBottom: 32,
    alignItems: "center",
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.text,
    opacity: 0.8,
    marginBottom: 24,
    textAlign: "center",
  },
  statsCard: {
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
  },
  statsContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
    marginTop: 4,
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
    zIndex: 1,
  },
  achievementItem: {
    width: "48%",
    marginBottom: 16,
  },
  achievementCard: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  achievementCardCompleted: {
    borderColor: "#65a83a",
    backgroundColor: "rgba(101, 168, 58, 0.1)",
  },
  achievementContent: {
    padding: 16,
    alignItems: "center",
    minHeight: 180,
    justifyContent: "space-between",
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  achievementIconCompleted: {
    backgroundColor: "rgba(101, 168, 58, 0.2)",
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 18,
  },
  achievementTitleCompleted: {
    color: "#65a83a",
  },
  achievementDescription: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.7,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 16,
  },
  xpContainer: {
    marginTop: "auto",
  },
  xpText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primaryForeground,
    textAlign: "center",
  },
  completionBadge: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
