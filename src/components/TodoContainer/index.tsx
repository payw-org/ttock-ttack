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

  return (
    <div className="todo-container" data-component="">
      <div
        className="row between title-wrapper"
        onClick={() => {
          setIsShowTodo(!isShowTodo)
        }}
      >
        <div className="title">To Do List</div>
      </div>
      <div className={'section-container ' + (!isShowTodo ? 'dp-none' : '')}>
        {todoSectionList.map((todoSection) => (
          <TodoSection {...todoSection} key={todoSection.id} />
        ))}
      </div>
    </div>
  )
}
