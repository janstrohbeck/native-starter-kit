import * as React from 'react'
import { ProgressBarAndroid } from 'react-native'

interface IProps {
  progress?: number
  color?: string
}

export default ({ progress, color, ...rest }: IProps) => (
  <ProgressBarAndroid
    {...rest}
    styleAttr='Horizontal'
    indeterminate={false}
    progress={progress ? progress / 100 : 0.5}
    color={color || '#FFF'}
  />
)
