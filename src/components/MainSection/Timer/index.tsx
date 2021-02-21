import React, { useEffect, useState } from 'react'
import { getDDay, getTwoDigit } from '@/utils/time'
import { DisplayTime } from './DisplayTime'
import './style.scss'

export type TimerProps = {
  mainDate: Date
}

const getRestTime = (origin: Date, current: Date, isNext = false): string[] => {
  const isOutOfDate = origin < current
  const timeGap: Date = new Date(
    isOutOfDate
      ? current.getTime() - origin.getTime() + (isNext ? 1000 : 0)
      : origin.getTime() - current.getTime() - (isNext ? 1000 : 0)
  )
  return getDDay(timeGap).map((v, index) =>
    index === 0 ? `${v}` : getTwoDigit(v)
  )
}

export const Timer: React.FC<TimerProps> = ({ mainDate }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  useEffect(() => {
    setTimeout(() => {
      setCurrentDateTime(new Date())
    }, 1000)
  }, [currentDateTime])

  const [restDay, hour, minute, second] = getRestTime(mainDate, currentDateTime)
  const [nextRestDay, nextHour, nextMinute, nextSecond] = getRestTime(
    mainDate,
    currentDateTime,
    true
  )

  return (
    <div className="timer" data-component="">
      <DisplayTime
        currentTime={restDay}
        nextTime={nextRestDay}
        unit="일"
      ></DisplayTime>
      <DisplayTime
        currentTime={hour}
        nextTime={nextHour}
        unit="시간"
      ></DisplayTime>
      <DisplayTime
        currentTime={minute}
        nextTime={nextMinute}
        unit="분"
      ></DisplayTime>
      <DisplayTime
        currentTime={second}
        nextTime={nextSecond}
        unit="초"
      ></DisplayTime>
    </div>
  )
}
