import { Image, ImageBackground, ScrollView } from "react-native";

import { ImagesSource } from "@/assets/images";
import { SafeAreaView } from "react-native-safe-area-context";

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
      id: "1",
      type: "mission" as const,
      status: "locked" as const,
      xp: 15,
      icon: "✝️",
      color: "#e74124",
      position: "center" as const,
    },
    {
      id: "2",
      type: "read" as const,
      status: "locked" as const,
      xp: 15,
      icon: "📖",
      color: "#e74124",
      position: "left" as const,
    },
    {
      id: "3",
      type: "quiz" as const,
      status: "locked" as const,
      xp: 15,
      icon: "🙏",
      color: "#e74124",
      position: "right" as const,
    },
    {
      id: "4",
      type: "chat" as const,
      status: "locked" as const,
      xp: 25,
      icon: "📚",
      color: "#F59E0B",
      position: "center" as const,
    },
    {
      id: "5",
      type: "mission" as const,
      status: "locked" as const,
      xp: 15,
      icon: "📜",
      color: "#e74124",
      position: "left" as const,
    },
    {
      id: "6",
      type: "read" as const,
      status: "locked" as const,
      xp: 20,
      icon: "📖",
      color: "#1E40AF",
      position: "right" as const,
    },
    {
      id: "6b",
      type: "quiz" as const,
      status: "locked" as const,
      xp: 25,
      icon: "🎯",
      color: "#059669",
      position: "left" as const,
    },
    {
      id: "6c",
      type: "chat" as const,
      status: "locked" as const,
      xp: 15,
      icon: "💬",
      color: "#7C3AED",
      position: "center" as const,
    },
    {
      id: "6d",
      type: "mission" as const,
      status: "locked" as const,
      xp: 30,
      icon: "🧠",
      color: "#EF4444",
      position: "right" as const,
    },
    {
      id: "7",
      type: "quiz" as const,
      status: "locked" as const,
      xp: 30,
      icon: "🏆",
      color: "#8B5CF6",
      position: "center" as const,
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
      position: "center" as const,
    },
  ],
};

function getPositionOffset(position: "left" | "right" | "center"): number {
  const baseOffset = 40;
  switch (position) {
    case "left":
      return -baseOffset;
    case "right":
      return baseOffset;
    default:
      return 0;
  }
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

export default function Journey() {
  return (
    <ImageBackground
      style={{
        flex: 1,
        // transform: [{ scale: 2.5 }],
      }}
      source={ImagesSource.background}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            paddingVertical: 40,
            paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          {journey.missions.map((mission, index) => (
            <Image
              key={mission.id}
              source={getMissionImageSource(mission)}
              style={{
                width: 80,
                height: 80,
                opacity: mission.status === "locked" ? 0.3 : 1,
                marginLeft: getPositionOffset(mission.position),
                marginVertical: 25,
              }}
              resizeMode="contain"
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
