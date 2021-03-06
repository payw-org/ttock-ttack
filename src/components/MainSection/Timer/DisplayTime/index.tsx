import React, { useEffect, useState } from 'react'
import './style.scss'

type DisplayTimeProps = {
  currentTime: string
  nextTime: string
  unit: string
}

type AnimationType = {
  transform: string
  transition: string
  opacity: number
}

function getDifference(str: string, from: string): string {
  if (str.length !== from.length) return str

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== from[i]) return str.substring(+i, str.length)
  }
  return ''
}

const animationConfig = {
  beforeScale: 0.7,
  targetY: '0.6em',
  duration: '0.4s',
  beforeOpacity: 0,
  delay: 500,
}

const getAnimationObj = (
  scale: number,
  translateY: string,
  transition: string,
  opacity: number
): AnimationType => ({
  transform: `scale(${scale}) translateY(${translateY})`,
  transition,
  opacity,
})

export const DisplayTime: React.FC<DisplayTimeProps> = ({
  currentTime,
  nextTime,
  unit,
}) => {
  const nextValue = getDifference(nextTime, currentTime)
  const [currentImmutable, currentMutable] = [
    currentTime.substring(0, currentTime.length - nextValue.length),
    currentTime.substring(
      currentTime.length - nextValue.length,
      currentTime.length
    ),
  ]
  const [inAnimation, setInAnimation] = useState<AnimationType>()
  const [outAnimation, setOutAnimation] = useState<AnimationType>()

  useEffect(() => {
    setInAnimation(
      getAnimationObj(
        animationConfig.beforeScale,
        `-${animationConfig.targetY}`,
        'initial',
        animationConfig.beforeOpacity
      )
    )
    setOutAnimation(getAnimationObj(1, '0', 'initial', 1))

    setTimeout(() => {
      setInAnimation(
        getAnimationObj(1, '0', `${animationConfig.duration} ease-in`, 1)
      )
      setOutAnimation(
        getAnimationObj(
          animationConfig.beforeScale,
          animationConfig.targetY,
          `${animationConfig.duration} ease-out`,
          animationConfig.beforeOpacity
        )
      )
    }, animationConfig.delay)
  }, [nextTime])

  const getLetterElements = (
    value: string,
    animation: AnimationType | undefined = undefined
  ): JSX.Element => {
    return value ? (
      <div style={animation}>
        {value.split('').map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>
    ) : (
      <></>
    )
  }

  return (
    <div className="display-time">
      <div className="value-wrapper">
        <div className="next-value">
          {getLetterElements(nextValue, inAnimation)}
        </div>
        <div className="current-value">
          {getLetterElements(currentImmutable)}
          {getLetterElements(currentMutable, outAnimation)}
        </div>
      </div>
      <div className="unit">{unit}</div>
    </div>
  )
}
