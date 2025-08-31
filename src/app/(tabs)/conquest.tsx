import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { ImagesSource } from "@/assets/images";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/styles/colors";
import { Container } from "@/components/container";

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "spiritual" | "knowledge" | "community" | "devotion";
  progress: number;
  maxProgress: number;
  xpReward: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  color: string;
};

const achievements: Achievement[] = [
  {
    id: "first_prayer",
    title: "Primeira Oração",
    description: "Complete sua primeira oração diária",
    icon: "🙏",
    category: "spiritual",
    progress: 1,
    maxProgress: 1,
    xpReward: 50,
    isUnlocked: true,
    isCompleted: true,
    color: "#65a83a",
  },
  {
    id: "quiz_master",
    title: "Mestre dos Quiz",
    description: "Complete 5 quiz com pontuação perfeita",
    icon: "🧠",
    category: "knowledge",
    progress: 3,
    maxProgress: 5,
    xpReward: 200,
    isUnlocked: true,
    isCompleted: false,
    color: colors.primaryForeground,
  },
  {
    id: "daily_devotion",
    title: "Devoção Diária",
    description: "Complete 7 dias consecutivos de devoção",
    icon: "📖",
    category: "devotion",
    progress: 4,
    maxProgress: 7,
    xpReward: 150,
    isUnlocked: true,
    isCompleted: false,
    color: "#e74124",
  },
  {
    id: "helping_hand",
    title: "Mão Amiga",
    description: "Complete 10 missões de ajuda ao próximo",
    icon: "🤝",
    category: "community",
    progress: 7,
    maxProgress: 10,
    xpReward: 300,
    isUnlocked: true,
    isCompleted: false,
    color: "#EF4444",
  },
  {
    id: "psalm_reader",
    title: "Leitor de Salmos",
    description: "Leia 20 salmos diferentes",
    icon: "📜",
    category: "devotion",
    progress: 12,
    maxProgress: 20,
    xpReward: 250,
    isUnlocked: true,
    isCompleted: false,
    color: colors.primaryForeground,
  },
  {
    id: "faithful_friend",
    title: "Amigo Fiel",
    description: "Ore por 15 pessoas diferentes",
    icon: "💝",
    category: "community",
    progress: 8,
    maxProgress: 15,
    xpReward: 180,
    isUnlocked: true,
    isCompleted: false,
    color: "#EC4899",
  },
  {
    id: "wisdom_seeker",
    title: "Buscador da Sabedoria",
    description: "Complete todos os módulos de fundamentos",
    icon: "🎓",
    category: "knowledge",
    progress: 0,
    maxProgress: 1,
    xpReward: 500,
    isUnlocked: false,
    isCompleted: false,
    color: "rgba(255, 255, 255, 0.3)",
  },
  {
    id: "spiritual_warrior",
    title: "Guerreiro Espiritual",
    description: "Complete 50 missões espirituais",
    icon: "⚔️",
    category: "spiritual",
    progress: 23,
    maxProgress: 50,
    xpReward: 1000,
    isUnlocked: true,
    isCompleted: false,
    color: "#F59E0B",
  },
];

const categoryColors = {
  spiritual: "#65a83a",
  knowledge: colors.primaryForeground,
  community: "#EF4444",
  devotion: "#e74124",
};

const categoryNames = {
  spiritual: "Espiritual",
  knowledge: "Conhecimento",
  community: "Comunidade",
  devotion: "Devoção",
};

export default function Conquest() {
  const { top } = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredAchievements =
    selectedCategory === "all"
      ? achievements
      : achievements.filter(
          (achievement) => achievement.category === selectedCategory
        );

  const completedAchievements = achievements.filter(
    (a) => a.isCompleted
  ).length;
  const totalXP = achievements
    .filter((a) => a.isCompleted)
    .reduce((sum, a) => sum + a.xpReward, 0);

  const getProgressPercentage = (achievement: Achievement) => {
    return (achievement.progress / achievement.maxProgress) * 100;
  };

  return (
    <Container>
      {/* Coins/XP Display */}
      <BlurView
        style={[styles.coinContainer, { top }]}
        intensity={50}
        tint="dark"
      >
        <View style={styles.coinContent}>
          <Text style={styles.coinText}>{totalXP}</Text>
          <Image
            source={ImagesSource.coin}
            style={styles.coinImage}
            resizeMode="contain"
          />
        </View>
      </BlurView>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Conquistas</Text>
          <Text style={styles.headerSubtitle}>
            {completedAchievements}/{achievements.length} conquistas
            desbloqueadas
          </Text>

          {/* Progress Overview */}
          <BlurView intensity={30} tint="dark" style={styles.overviewCard}>
            <View style={styles.overviewContent}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{completedAchievements}</Text>
                <Text style={styles.statLabel}>Completas</Text>
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

        {/* Category Filter */}
        <View style={styles.categoryFilter}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryFilterContent}
          >
            <TouchableOpacity
              onPress={() => setSelectedCategory("all")}
              style={[
                styles.categoryButton,
                selectedCategory === "all" && styles.categoryButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === "all" && styles.categoryButtonTextActive,
                ]}
              >
                Todas
              </Text>
            </TouchableOpacity>

            {Object.entries(categoryNames).map(([key, name]) => (
              <TouchableOpacity
                key={key}
                onPress={() => setSelectedCategory(key)}
                style={[
                  styles.categoryButton,
                  selectedCategory === key && styles.categoryButtonActive,
                  {
                    borderColor:
                      categoryColors[key as keyof typeof categoryColors],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === key && styles.categoryButtonTextActive,
                  ]}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Achievements List */}
        <View style={styles.achievementsList}>
          {filteredAchievements.map((achievement) => (
            <TouchableOpacity
              key={achievement.id}
              style={[
                styles.achievementCard,
                styles.achievementCardContent,
                !achievement.isUnlocked && styles.achievementCardLocked,
                achievement.isCompleted && styles.achievementCardCompleted,
              ]}
              disabled={!achievement.isUnlocked}
            >
              <BlurView
                intensity={achievement.isUnlocked ? 50 : 20}
                tint="dark"
                style={styles.achievementCardBlur}
              >
                {/* Achievement Icon */}
                <View
                  style={[
                    styles.achievementIcon,
                    {
                      backgroundColor: achievement.isUnlocked
                        ? achievement.color
                        : "rgba(255, 255, 255, 0.2)",
                    },
                  ]}
                >
                  <Text style={styles.achievementIconText}>
                    {achievement.isUnlocked ? achievement.icon : "🔒"}
                  </Text>
                </View>

                {/* Achievement Info */}
                <View style={styles.achievementInfo}>
                  <Text
                    style={[
                      styles.achievementTitle,
                      !achievement.isUnlocked && styles.achievementTitleLocked,
                    ]}
                  >
                    {achievement.isUnlocked ? achievement.title : "???"}
                  </Text>
                  <Text
                    style={[
                      styles.achievementDescription,
                      !achievement.isUnlocked &&
                        styles.achievementDescriptionLocked,
                    ]}
                  >
                    {achievement.isUnlocked
                      ? achievement.description
                      : "Complete missões anteriores para desbloquear"}
                  </Text>

                  {/* Progress Bar */}
                  {achievement.isUnlocked && (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <LinearGradient
                          colors={[achievement.color, achievement.color + "80"]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={[
                            styles.progressFill,
                            { width: `${getProgressPercentage(achievement)}%` },
                          ]}
                        />
                      </View>
                      <Text style={styles.progressText}>
                        {achievement.progress}/{achievement.maxProgress}
                      </Text>
                    </View>
                  )}
                </View>

                {/* XP Reward */}
                <View style={styles.xpReward}>
                  <Text style={styles.xpRewardText}>
                    +{achievement.xpReward}
                  </Text>
                  <Text style={styles.xpLabel}>XP</Text>
                </View>

                {/* Completion Badge */}
                {achievement.isCompleted && (
                  <View style={styles.completionBadge}>
                    <Text style={styles.completionBadgeText}>✓</Text>
                  </View>
                )}
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  coinContainer: {
    position: "absolute",
    right: 20,
    zIndex: 100,
    borderRadius: 10,
    overflow: "hidden",
  },
  coinContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  coinText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  coinImage: {
    width: 30,
    height: 30,
  },
  scrollContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  headerSection: {
    marginBottom: 24,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.text,
    opacity: 0.8,
    marginBottom: 20,
  },
  overviewCard: {
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
  },
  overviewContent: {
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
  categoryFilter: {
    marginBottom: 24,
    height: 40,
  },
  categoryFilterContent: {
    paddingHorizontal: 4,
    gap: 12,
    alignItems: "center",
  },
  categoryButton: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  categoryButtonActive: {
    backgroundColor: "rgba(159, 144, 200, 0.2)",
    borderColor: colors.primaryForeground,
  },
  categoryButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "500",
  },
  categoryButtonTextActive: {
    color: colors.primaryForeground,
    fontWeight: "bold",
  },
  achievementsList: {
    gap: 16,
  },
  achievementCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementCardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  achievementCardCompleted: {
    borderColor: "#65a83a",
    backgroundColor: "rgba(101, 168, 58, 0.15)",
  },
  achievementCardBlur: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  achievementIconText: {
    fontSize: 24,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  achievementTitleLocked: {
    opacity: 0.6,
  },
  achievementDescription: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
    marginBottom: 12,
  },
  achievementDescriptionLocked: {
    opacity: 0.5,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.8,
    fontWeight: "600",
  },
  xpReward: {
    alignItems: "center",
  },
  xpRewardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primaryForeground,
  },
  xpLabel: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.7,
  },
  completionBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#65a83a",
    alignItems: "center",
    justifyContent: "center",
  },
  completionBadgeText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
});
