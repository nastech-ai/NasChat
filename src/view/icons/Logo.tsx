import {forwardRef} from 'react'
import {type TextProps} from 'react-native'
import {Image} from 'expo-image'
import type {SvgProps} from 'react-native-svg'

import {useTheme} from '#/alf'
import {flatten} from '#/alf'

const ratio = 1

type Props = {
  fill?: string
  style?: TextProps['style']
} & Omit<SvgProps, 'style'>

export const Logo = forwardRef(function LogoImpl(props: Props, _ref) {
  const t = useTheme()
  const {fill, ...rest} = props
  const styles = flatten(props.style)
  // @ts-ignore it's fiiiiine
  const size = parseInt(rest.width || 32, 10)

  const isDark = t.name === 'dark'

  return (
    <Image
      source={
        isDark
          ? require('../../../assets/naschat-logo-light.png')
          : require('../../../assets/naschat-logo-light.png')
      }
      accessibilityLabel="NasChat"
      accessibilityHint=""
      accessibilityIgnoresInvertColors
      style={[{height: size, width: size, aspectRatio: 1}]}
    />
  )
})
