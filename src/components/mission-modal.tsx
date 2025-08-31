import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";

import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { ImagesSource } from "@/assets/images";
import { colors } from "@/styles/colors";

type Mission = {
  id: number;
  title: string;
  completed: boolean;
};

type MissionModalProps = {
  visible: boolean;
  onClose: () => void;
  onComplete?: (completedMissions: number) => void;
};

const missions: Mission[] = [
  {
    id: 1,
    title: "Abraçar um amigo",
    completed: false,
  },
  {
    id: 2,
    title: "Orar por um irmão",
    completed: false,
  },
  {
    id: 3,
    title: "Ler um salmo",
    completed: false,
  },
  {
    id: 4,
    title: "Perdoar alguém",
    completed: false,
  },
  {
    id: 5,
    title: "Ajudar alguém necessitado",
    completed: false,
  },
  {
    id: 6,
    title: "Compartilhar uma palavra de encorajamento",
    completed: false,
  },
];

export function MissionModal({ visible, onClose, onComplete }: MissionModalProps) {
  const [missionStates, setMissionStates] = useState<Mission[]>(missions);

  // Reset missions when modal opens
  useEffect(() => {
    if (visible) {
      setMissionStates(missions.map(mission => ({ ...mission, completed: false })));
    }
  }, [visible]);

  const handleMissionToggle = (missionId: number) => {
    setMissionStates(prevStates =>
      prevStates.map(mission =>
        mission.id === missionId
          ? { ...mission, completed: !mission.completed }
          : mission
      )
    );
  };

  const handleClose = () => {
    const completedCount = missionStates.filter(mission => mission.completed).length;
    if (onComplete) {
      onComplete(completedCount);
    }
    onClose();
  };

  const completedMissions = missionStates.filter(mission => mission.completed).length;
  const totalMissions = missionStates.length;

  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={{ width: 320 }}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={{ position: "relative" }}>
              <Image source={ImagesSource.mascote} style={styles.mascote} />
              <BlurView intensity={50} tint="dark" style={styles.card}>
                <Text style={styles.title}>Missões Diárias</Text>
                <Text style={styles.subtitle}>
                  Complete as missões para crescer espiritualmente
                </Text>

                <ScrollView 
                  style={styles.missionsList} 
                  showsVerticalScrollIndicator={false}
                >
                  {missionStates.map((mission) => (
                    <TouchableOpacity
                      key={mission.id}
                      onPress={() => handleMissionToggle(mission.id)}
                      style={styles.missionItem}
                    >
                      <BlurView
                        intensity={30}
                        tint="dark"
                        style={[
                          styles.missionContainer,
                          mission.completed && styles.missionCompleted
                        ]}
                      >
                        <View style={styles.missionContent}>
                          <View style={[
                            styles.checkbox,
                            mission.completed && styles.checkboxChecked
                          ]}>
                            {mission.completed && (
                              <Text style={styles.checkmark}>✓</Text>
                            )}
                          </View>
                          <Text style={[
                            styles.missionText,
                            mission.completed && styles.missionTextCompleted
                          ]}>
                            {mission.title}
                          </Text>
                        </View>
                      </BlurView>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Text style={styles.progressText}>
                  {completedMissions}/{totalMissions} missões concluídas
                </Text>
              </BlurView>
            </View>

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.buttonCloseContainer}
                activeOpacity={0.8}
                onPress={handleClose}
              >
                <LinearGradient
                  colors={["#65a83a", "#3b8033"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.buttonClose}
                >
                  <Text style={styles.buttonCloseText}>
                    Concluir
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
    minHeight: 400,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: colors.text,
    opacity: 0.8,
    marginBottom: 8,
  },
  missionsList: {
    width: "100%",
    maxHeight: 300,
  },
  missionItem: {
    marginBottom: 8,
  },
  missionContainer: {
    borderRadius: 12,
    padding: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  missionCompleted: {
    borderColor: "#65a83a",
    backgroundColor: "rgba(101, 168, 58, 0.1)",
  },
  missionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#65a83a",
    borderColor: "#65a83a",
  },
  checkmark: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  missionText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  missionTextCompleted: {
    opacity: 0.7,
    textDecorationLine: "line-through",
  },
  progressText: {
    textAlign: "center",
    color: colors.text,
    marginTop: 16,
    opacity: 0.8,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonCloseContainer: {
    borderRadius: 80,
    marginTop: 16,
    overflow: "hidden",
  },
  buttonClose: {
    padding: 12,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonCloseText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
