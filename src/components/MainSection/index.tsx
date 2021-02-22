import React, { useRef, useState } from 'react'
import { useStore } from '@/store'
import { getFormattedDate } from '@/utils/time'
import { setElementAtCursor } from '@/utils/events'
import { Timer } from './Timer'
import './style.scss'

export const MainSection: React.FC = () => {
  const {
    store: { mainTodo },
  } = useStore()
  const [isShowDate, setIsShowDate] = useState<boolean>(false)
  const dateElement = useRef<HTMLDivElement>(null)

  const showDate = (e) => {
    if (!isShowDate) setIsShowDate(true)

    setTimeout(() => {
      if (!dateElement.current) return

      setElementAtCursor(dateElement.current, e)
    }, 0)
  }

  return (
    <div className="main-section" data-component="">
      <div className="title-wrapper">
        <span
          className="title"
          onPointerMove={showDate}
          onPointerOut={() => setIsShowDate(false)}
        >
          {mainTodo.title}
          <div
            className={'date ' + (isShowDate ? 'show' : 'hide')}
            ref={dateElement}
          >
            {getFormattedDate(mainTodo.dueDate, 'YYYY년 M월 D일 hh:mm')}
          </div>
        </span>
        <span className="suffix">
          {mainTodo.dueDate > new Date() ? '남은시간' : '지난시간'}
        </span>
      </div>
      <Timer mainDate={mainTodo.dueDate}></Timer>
    </div>
  )
}
