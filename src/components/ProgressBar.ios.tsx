import * as React from 'react'
import { ProgressViewIOS } from 'react-native'

interface IProps {
  progress?: number
  color?: string
}

export default ({ progress, color, ...rest }: IProps) => (
  <ProgressViewIOS
    {...rest}
    progress={progress ? progress / 100 : 0.5}
    progressTintColor={color || '#FFF'}
    trackTintColor='rgba(255,255,255,0.5)'
  />
)
