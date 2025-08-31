import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

import { ImagesSource } from "@/assets/images";
import { colors } from "@/styles/colors";
import { useAuthStore } from "@/store/auth";
import { Container } from "@/components/container";

type UserStats = {
  level: number;
  xp: number;
  maxXp: number;
  completedMissions: number;
  totalMissions: number;
  streak: number;
  achievements: number;
};

const userProfile = {
  name: "João Silva",
  joinDate: "Janeiro 2024",
  stats: {
    level: 5,
    xp: 2350,
    maxXp: 3000,
    completedMissions: 23,
    totalMissions: 30,
    streak: 7,
    achievements: 4,
  } as UserStats,
};

const menuItems = [
  {
    id: "settings",
    title: "Configurações",
    icon: "settings-outline" as keyof typeof Ionicons.glyphMap,
    description: "Ajustar preferências do app",
  },
  {
    id: "notifications",
    title: "Notificações",
    icon: "notifications-outline" as keyof typeof Ionicons.glyphMap,
    description: "Gerenciar lembretes e alertas",
  },
  {
    id: "privacy",
    title: "Privacidade",
    icon: "lock-closed-outline" as keyof typeof Ionicons.glyphMap,
    description: "Controlar dados e privacidade",
  },
  {
    id: "help",
    title: "Ajuda",
    icon: "help-circle-outline" as keyof typeof Ionicons.glyphMap,
    description: "Suporte e dúvidas frequentes",
  },
  {
    id: "about",
    title: "Sobre",
    icon: "information-circle-outline" as keyof typeof Ionicons.glyphMap,
    description: "Informações do aplicativo",
  },
  {
    id: "logout",
    title: "Sair",
    icon: "log-out-outline" as keyof typeof Ionicons.glyphMap,
    description: "Sair da sua conta",
  },
];

export default function Profile() {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const getXpPercentage = () => {
    return (userProfile.stats.xp / userProfile.stats.maxXp) * 100;
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => {
            logout();
            router.replace("/login");
          },
        },
      ]
    );
  };

  const handleMenuItemPress = (itemId: string) => {
    if (itemId === "logout") {
      handleLogout();
    } else {
      // Handle other menu items
      Alert.alert("Em breve", `Funcionalidade "${itemId}" será implementada em breve.`);
    }
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
          <Text style={styles.coinText}>{userProfile.stats.xp}</Text>
          <Image
            source={ImagesSource.coin}
            style={styles.coinImage}
            resizeMode="contain"
          />
        </View>
      </BlurView>

      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { paddingTop: top + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={48} color={colors.text} />
          </View>
          <Text style={styles.profileName}>{user?.name || userProfile.name}</Text>
          <Text style={styles.joinDate}>Membro desde {userProfile.joinDate}</Text>
        </View>

        {/* Level Progress */}
        <BlurView intensity={30} tint="dark" style={styles.levelCard}>
          <View style={styles.levelContent}>
            <View style={styles.levelInfo}>
              <Text style={styles.levelTitle}>Nível {userProfile.stats.level}</Text>
              <Text style={styles.xpText}>
                {userProfile.stats.xp} / {userProfile.stats.maxXp} XP
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${getXpPercentage()}%` }
                  ]}
                />
              </View>
            </View>
          </View>
        </BlurView>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <BlurView intensity={30} tint="dark" style={styles.statCard}>
            <Text style={styles.statNumber}>{userProfile.stats.completedMissions}</Text>
            <Text style={styles.statLabel}>Missões</Text>
            <Text style={styles.statLabel}>Completas</Text>
          </BlurView>

          <BlurView intensity={30} tint="dark" style={styles.statCard}>
            <Text style={styles.statNumber}>{userProfile.stats.streak}</Text>
            <Text style={styles.statLabel}>Dias</Text>
            <Text style={styles.statLabel}>Seguidos</Text>
          </BlurView>

          <BlurView intensity={30} tint="dark" style={styles.statCard}>
            <Text style={styles.statNumber}>{userProfile.stats.achievements}</Text>
            <Text style={styles.statLabel}>Conquistas</Text>
            <Text style={styles.statLabel}>Desbloqueadas</Text>
          </BlurView>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(item.id)}
            >
              <BlurView intensity={30} tint="dark" style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIconContainer}>
                    <Ionicons name={item.icon} size={24} color={colors.text} />
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuDescription}>{item.description}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward-outline" size={20} color={colors.text} style={{ opacity: 0.5 }} />
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versão 1.0.0</Text>
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
  profileHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryForeground,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 48,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
  },
  levelCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
  },
  levelContent: {
    padding: 20,
  },
  levelInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  xpText: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
  },
  progressBarContainer: {
    width: "100%",
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primaryForeground,
    borderRadius: 4,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 4,
    paddingTop: 16,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.8,
    textAlign: "center",
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  menuSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  menuItem: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIconContainer: {
    marginRight: 16,
    width: 24,
    alignItems: "center",
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
  },
  versionContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.5,
  },
});
