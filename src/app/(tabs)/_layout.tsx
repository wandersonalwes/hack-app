import { Tabs } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'

import { colors } from '@/styles/colors'

export default function JourneyLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#9F90C8',
        tabBarStyle: {
          backgroundColor: colors.background,
          height: 100,
          paddingTop: 16,
        },
      }}
    >
      <Tabs.Screen
        name="journey"
        options={{
          title: 'Jornada',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'map' : 'map-outline'} color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="conquest"
        options={{
          title: 'Conquista',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'trophy' : 'trophy-outline'} color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}
