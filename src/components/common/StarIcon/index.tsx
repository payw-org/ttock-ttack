import React, { useEffect, useState } from 'react'
import './style.scss'

export type StarIconProps = {
  isActive?: boolean
  fontSize?: string
  color?: string
  background?: string
  activeColor?: string
  activeBackground?: string
}

type derivedStyle = {
  padding?: string
  borderRadius?: string
}

export const StarIcon: React.FC<StarIconProps> = (props) => {
  const [iconStyle, setIconStyle] = useState<StarIconProps & derivedStyle>({})
  const propsKeys = Object.keys(props) as (keyof StarIconProps)[]

  useEffect(() => {
    const newStyle = { ...iconStyle }

    propsKeys.forEach((key) => {
      if (key === 'isActive') return

      newStyle[key] = props[key]

      if (key === 'color') {
        newStyle[key] = props.isActive
          ? props.activeColor || props[key]
          : props[key]
      } else if (key === 'background') {
        newStyle[key] = props.isActive
          ? props.activeBackground || props[key]
          : props[key]
      }
    })

    if (newStyle.fontSize) {
      const fontSize: number = +newStyle.fontSize.replace(/\D+$/g, '')
      newStyle.padding = `${(fontSize / 6).toFixed(2)}rem`
      newStyle.borderRadius = `${(fontSize / 6).toFixed(2)}rem`
    }

    setIconStyle({ ...newStyle })
  }, [props.isActive])

  return (
    <i
      className={'f7-icons star-icon ' + (props.isActive ? 'active' : '')}
      data-component=""
      style={iconStyle}
    >
      star_fill
    </i>
  )
}
