import React from 'react'
import { getFormattedDate } from '@/utils/time'
import './style.scss'

export type TodoProps = {
  id: number
  title: string
  dueDate: Date
  isMain: boolean
}

export const Todo: React.FC<TodoProps> = ({ title, dueDate, isMain }) => {
  return (
    <div className="todo">
      <div className="row between">
        <div className="title-wrapper">
          <h3 className="title">{title}</h3>
          <div className={'star' + (isMain ? 'main' : '')}></div>
        </div>
        <div className="menu-wrapper">
          <i className="f7-icons menu">ellipsis_vertical</i>
        </div>
      </div>
      <div className="row">
        <div className="date">
          {getFormattedDate(new Date(dueDate), 'YYYY.MM.DD hh:mm')}
        </div>
      </div>
    </div>
  )
}
