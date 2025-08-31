import { colors } from '@/styles/colors'
import { View, ViewProps } from 'react-native'

type ContainerProps = ViewProps

export function Container({ children, style }: ContainerProps) {
  return <View style={[{ flex: 1, backgroundColor: colors.background }, style]}>{children}</View>
}
