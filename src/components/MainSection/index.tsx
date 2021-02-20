import React from 'react'
import { useStore } from '@/store'
import { Timer } from './Timer'
import './style.scss'

export const MainSection: React.FC = () => {
  const {
    store: { mainTodo },
  } = useStore()

  return (
    <div className="main-section" data-component="">
      <div className="title-wrapper">
        <span className="title">{mainTodo.title}</span>
        <span className="suffix">
          {mainTodo.dueDate > new Date() ? '남은시간' : '지난시간'}
        </span>
      </div>
      <Timer mainDate={mainTodo.dueDate}></Timer>
    </div>
  )
}
