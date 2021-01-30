import { getDDay } from '@/utils/time'
import React, { useState } from 'react'
import { DisplayTime } from './DisplayTime'
import './style.scss'

interface TimerProps {
  dateTime: Date
}

function getTwoDigit(num: number): string {
  return num < 10 ? `0${num}` : num.toString()
}

export const Timer: React.FC<TimerProps> = ({ dateTime }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  setTimeout(() => {
    setCurrentDateTime(new Date())
  }, 1000)

  const timeGap: Date = new Date(dateTime.getTime() - currentDateTime.getTime())
  const [restDay, hour, minute, second] = getDDay(timeGap).map((v) =>
    getTwoDigit(v)
  )

  const nextTimeGap: Date = new Date(
    dateTime.getTime() - currentDateTime.getTime() - 1000
  )
  const [nextRestDay, nextHour, nextMinute, nextSecond] = getDDay(
    nextTimeGap
  ).map((v) => getTwoDigit(v))

  return (
    <div className="timer">
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
