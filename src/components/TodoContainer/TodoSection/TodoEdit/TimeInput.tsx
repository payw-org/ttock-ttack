import React from 'react'
import { autoScaleInputHandler } from '@/utils/events'
import { TIME_INFO } from '@/utils/constants'
import { getTwoDigit } from '@/utils/time'

export type TimeInputProps = {
  className: string
  value: string
  setValue: Function
}

export const TimeInput: React.FC<TimeInputProps> = ({
  className,
  value,
  setValue,
}) => {
  const inputTime = (e) => {
    const [targetValue, min, max] = [
      e.target.value,
      +e.target.min,
      +e.target.max,
    ]

    const newValue: number =
      targetValue < min ? min : targetValue > max ? max : targetValue

    setValue(getTwoDigit(newValue))

    setTimeout(() => {
      autoScaleInputHandler(e)
    }, 0)
  }

  return (
    <input
      type="number"
      className={className}
      placeholder={TIME_INFO[className].placeholder}
      min={TIME_INFO[className].min}
      max={TIME_INFO[className].max}
      value={value}
      onInput={(e) => {
        inputTime(e)
      }}
    />
  )
}
