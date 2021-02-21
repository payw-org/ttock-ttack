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
  beforeOpacity: 0,
  beforeScale: 0.7,
  targetY: '0.6em',
  duration: 300,
  delay: 300,
  disappearDelay: 100,
}

const guardConfig = {
  disappearTime: 100,
  appearTime: 800,
}

const getAnimationObj = (
  opacity: number,
  transition?: string,
  scale?: number,
  translateY?: string
): AnimationType => {
  const animation = {
    transition: transition ? transition : 'initial',
    opacity,
    transform: 'initial',
  }
  if (scale && translateY) {
    animation.transform = `scale(${scale}) translateY(${translateY})`
  } else if (scale) {
    animation.transform = `scale(${scale})`
  } else if (translateY) {
    animation.transform = `translateY(${translateY})`
  }
  return animation
}

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
  const [guardAnimation, setGuardAnimation] = useState<AnimationType>()
  const [guard, setGuard] = useState<string>(nextValue)

  useEffect(() => {
    setInAnimation(
      getAnimationObj(
        animationConfig.beforeOpacity,
        undefined,
        animationConfig.beforeScale,
        `-${animationConfig.targetY}`
      )
    )
    setOutAnimation(getAnimationObj(1))
    setGuardAnimation(getAnimationObj(0))

    setTimeout(() => {
      setGuard(nextValue)
    }, guardConfig.disappearTime)

    setTimeout(() => {
      setInAnimation(
        getAnimationObj(1, `${animationConfig.duration}ms ease-in`)
      )
      setOutAnimation(
        getAnimationObj(
          animationConfig.beforeOpacity,
          `${animationConfig.duration}ms ease-out`,
          animationConfig.beforeScale,
          animationConfig.targetY
        )
      )
    }, animationConfig.delay)

    setTimeout(() => {
      setGuardAnimation(getAnimationObj(1))
      setInAnimation(
        getAnimationObj(0, `0s ${animationConfig.disappearDelay}ms`)
      )
    }, guardConfig.appearTime)
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
        <div className="next-value guard">
          {getLetterElements(guard, guardAnimation)}
        </div>
      </div>
      <div className="unit">{unit}</div>
    </div>
  )
}
