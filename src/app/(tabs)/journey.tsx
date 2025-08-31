import { Image, ImageBackground } from 'react-native'

import { ImagesSource } from '@/assets/images'
import { SafeAreaView } from 'react-native-safe-area-context'

type Mission = {
  id: string
  type: string
  status: string
  xp: number
  icon: string
  color: string
  position: string
}

const journey = {
  id: '1',
  title: 'Fundamentos da Fé',
  description: 'Aprenda os pilares básicos da fé cristã',
  isUnlocked: true,
  color: ['#e74124', '#ec16bdff'],
  missions: [
    {
      id: '1',
      type: 'mission',
      status: 'locked',
      xp: 15,
      icon: '✝️',
      color: '#e74124',
      position: 'center',
    },
    {
      id: '2',
      type: 'read',
      status: 'locked',
      xp: 15,
      icon: '📖',
      color: '#e74124',
      position: 'left',
    },
    {
      id: '3',
      type: 'quiz',
      status: 'locked',
      xp: 15,
      icon: '🙏',
      color: '#e74124',
      position: 'right',
    },
    {
      id: '4',
      type: 'chat',
      status: 'locked',
      xp: 25,
      icon: '📚',
      color: '#F59E0B',
      position: 'center',
    },
    {
      id: '5',
      type: 'mission',
      status: 'locked',
      xp: 15,
      icon: '📜',
      color: '#e74124',
      position: 'left',
    },
    {
      id: '6',
      type: 'read',
      status: 'locked',
      xp: 20,
      icon: '📖',
      color: '#1E40AF',
      position: 'right',
    },
    {
      id: '6b',
      type: 'quiz',
      status: 'locked',
      xp: 25,
      icon: '🎯',
      color: '#059669',
      position: 'left',
    },
    {
      id: '6c',
      type: 'chat',
      status: 'locked',
      xp: 15,
      icon: '💬',
      color: '#7C3AED',
      position: 'center',
    },
    {
      id: '6d',
      type: 'mission',
      status: 'locked',
      xp: 30,
      icon: '🧠',
      color: '#EF4444',
      position: 'right',
    },
    {
      id: '7',
      type: 'quiz',
      status: 'locked',
      xp: 30,
      icon: '🏆',
      color: '#8B5CF6',
      position: 'center',
    },
    {
      id: '8',
      type: 'chat',
      status: 'locked',
      xp: 15,
      icon: '🕊️',
      color: '#e74124',
      position: 'left',
    },
    {
      id: '9',
      type: 'mission',
      status: 'current',
      xp: 15,
      icon: '👑',
      color: '#e74124',
      position: 'right',
    },
    {
      id: '10',
      type: 'read',
      status: 'completed',
      xp: 20,
      icon: '💪',
      color: '#EF4444',
      position: 'center',
    },
  ],
}

function getPositionOffset(position: 'left' | 'right' | 'center'): number {
  const baseOffset = 40
  switch (position) {
    case 'left':
      return -baseOffset
    case 'right':
      return baseOffset
    default:
      return 0
  }
}

function getMissionImageSource(mission: Mission) {
  const typeMap: Record<Mission['type'], { ok: string; on: string }> = {
    read: { ok: ImagesSource.readOk, on: ImagesSource.readOn },
    chat: { ok: ImagesSource.chatOk, on: ImagesSource.chatOn },
    quiz: { ok: ImagesSource.quizOk, on: ImagesSource.quizOn },
    mission: { ok: ImagesSource.flashOk, on: ImagesSource.flashOn },
  }

  const { ok, on } = typeMap[mission.type]
  return mission.status === 'completed' ? ok : on
}

export default function Journey() {
  return (
    <ImageBackground
      style={{
        flex: 1,
        // height: 1000,
        transform: [{ scale: 2.5 }],
      }}
      source={ImagesSource.background}
    >
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        {journey.missions.map((mission) => (
          <Image
            key={mission.id}
            source={getMissionImageSource(mission)}
            style={{
              width: 50,
              height: 50,
              opacity: mission.status === 'locked' ? 0.3 : 1,
              marginLeft: getPositionOffset(mission.position),
            }}
            resizeMode="contain"
          />
        ))}
      </SafeAreaView>
    </ImageBackground>
  )
}
