import { ImageBackground } from 'react-native'

import { ImagesSource } from '@/assets/images'

export default function Journey() {
  return (
    <ImageBackground
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ scale: 1.5 }],
      }}
      source={ImagesSource.background}
    ></ImageBackground>
  )
}
