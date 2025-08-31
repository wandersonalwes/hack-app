import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BlurView } from "expo-blur";

import { ImagesSource } from "@/assets/images";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Mission = {
  id: string;
  type: string;
  status: string;
  xp: number;
  icon: string;
  color: string;
  position: string;
};

const journey = {
  id: "1",
  title: "Fundamentos da Fé",
  description: "Aprenda os pilares básicos da fé cristã",
  isUnlocked: true,
  color: ["#e74124", "#ec16bdff"],
  missions: [
    {
      id: "6c",
      type: "chat" as const,
      status: "locked" as const,
      xp: 15,
      icon: "💬",
      color: "#7C3AED",
      position: "right" as const,
    },
    {
      id: "6d",
      type: "mission" as const,
      status: "locked" as const,
      xp: 30,
      icon: "🧠",
      color: "#EF4444",
      position: "left" as const,
    },
    {
      id: "7",
      type: "quiz" as const,
      status: "locked" as const,
      xp: 30,
      icon: "🏆",
      color: "#8B5CF6",
      position: "right" as const,
    },
    {
      id: "8",
      type: "chat" as const,
      status: "locked" as const,
      xp: 15,
      icon: "🕊️",
      color: "#e74124",
      position: "left" as const,
    },
    {
      id: "9",
      type: "mission" as const,
      status: "current" as const,
      xp: 15,
      icon: "👑",
      color: "#e74124",
      position: "right" as const,
    },
    {
      id: "10",
      type: "read" as const,
      status: "completed" as const,
      xp: 20,
      icon: "💪",
      color: "#EF4444",
      position: "left" as const,
    },
  ],
};

// Path coordinates for each mission to align with background path
// These coordinates are calculated based on the background image path
const missionPathCoordinates: Record<string, { x: number; y: number }> = {
  "6c": { x: 90, y: 100 }, // Right curve
  "6d": { x: -80, y: 240 }, // Left curve
  "7": { x: 40, y: 390 }, // Right side
  "8": { x: -110, y: 550 }, // Left curve
  "9": { x: 50, y: 700 }, // Right side
  "10": { x: -80, y: 900 }, // Final left position
};

function getMissionPathPosition(missionId: string): { x: number; y: number } {
  return missionPathCoordinates[missionId] || { x: 0, y: 0 };
}

function getMissionImageSource(mission: Mission) {
  const typeMap: Record<Mission["type"], { ok: string; on: string }> = {
    read: { ok: ImagesSource.readOk, on: ImagesSource.readOn },
    chat: { ok: ImagesSource.chatOk, on: ImagesSource.chatOn },
    quiz: { ok: ImagesSource.quizOk, on: ImagesSource.quizOn },
    mission: { ok: ImagesSource.flashOk, on: ImagesSource.flashOn },
  };

  const { ok, on } = typeMap[mission.type];
  return mission.status === "completed" ? ok : on;
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
    paddingHorizontal: 15,
    minHeight: "100%",
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    transform: [{ scale: 2.5 }],
    zIndex: -1,
  },
  missionImage: {
    position: "absolute",
    width: 80,
    height: 80,
    left: "50%",
    zIndex: 1,
  },
  spacer: {
    width: 1,
    height: 1040,
    opacity: 0,
  },
});

export default function Journey() {
  const { top } = useSafeAreaInsets();
  return (
    <>
      <BlurView
        style={[styles.coinContainer, { top }]}
        intensity={50}
        tint="dark"
      >
        <View style={styles.coinContent}>
          <Text style={styles.coinText}>5000</Text>
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
      >
        {/* Background Image - Scrollable with content */}
        <Image
          source={ImagesSource.background}
          style={styles.backgroundImage}
          resizeMode="contain"
        />

        {/* Journey Missions positioned on path */}
        {journey.missions.map((mission, index) => {
          const pathPosition = getMissionPathPosition(mission.id);
          return (
            <TouchableOpacity
              key={mission.id}
              style={{
                opacity: mission.status === "locked" ? 0.4 : 1,
                marginLeft: pathPosition.x - 40, // Center the 80px image (40px offset)
                top: pathPosition.y + 40, // Add padding offset
              }}
              disabled={mission.status === "locked"}
            >
              <Image
                // @ts-ignore
                source={getMissionImageSource(mission)}
                style={[styles.missionImage]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        })}

        {/* Invisible spacer to ensure proper scroll height */}
        <Image style={styles.spacer} />
      </ScrollView>
    </>
  );
}
