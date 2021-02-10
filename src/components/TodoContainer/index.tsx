import React, { useState } from 'react'
import './style.scss'
import { TodoSection, TodoSectionProps } from './TodoSection'

export type TodoContainerProps = {
  isShow: boolean
  todoSectionList: TodoSectionProps[]
}

export const TodoContainer: React.FC<TodoContainerProps> = ({
  isShow,
  todoSectionList,
}) => {
  const [isShowTodo, setIsShowTodo] = useState(isShow)
  const toggleContainer = () => {
    setIsShowTodo(!isShowTodo)
  }

  return (
    <div
      className={'todo-container ' + (isShowTodo ? 'minus' : 'plus')}
      data-component=""
    >
      <div className="row between title-wrapper">
        <div className="title">To Do List</div>
        <i className="f7-icons plus" onClick={toggleContainer}>
          plus_square
        </i>
        <i className="f7-icons minus" onClick={toggleContainer}>
          minus_square
        </i>
      </div>
      <div className={'section-container ' + (!isShowTodo ? 'dp-none' : '')}>
        {todoSectionList.map((todoSection) => (
          <TodoSection {...todoSection} key={todoSection.id} />
        ))}
      </div>
    </div>
  )
}
