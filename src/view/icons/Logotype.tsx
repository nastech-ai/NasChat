import {type TextProps} from 'react-native'
import {Image} from 'expo-image'
import type {SvgProps} from 'react-native-svg'

import {useTheme} from '#/alf'
import {flatten} from '#/alf'

type Props = {
  fill?: string
  style?: TextProps['style']
} & Omit<SvgProps, 'style'>

export function Logotype({fill, ...rest}: Props) {
  const t = useTheme()
  const styles = flatten(rest.style as TextProps['style'])
  // @ts-ignore it's fiiiiine
  const size = parseInt(rest.width || 120, 10)

  const isDark = t.name === 'dark'

  return (
    <Image
      source={require('../../../assets/naschat-logo-light.png')}
      accessibilityLabel="NasChat"
      accessibilityIgnoresInvertColors
      style={[{height: size * 0.35, width: size, aspectRatio: size / (size * 0.35)}]}
    />
  )
}
