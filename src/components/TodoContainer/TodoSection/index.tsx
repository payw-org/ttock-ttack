import React, { useState } from 'react'
import './style.scss'
import { Todo, TodoProps } from './Todo'

export type TodoSectionProps = {
  id: number
  isShow: boolean
  title: string
  todoList: TodoProps[]
}

export const TodoSection: React.FC<TodoSectionProps> = ({
  id,
  isShow,
  title,
  todoList,
}) => {
  const [isShowTodo, setIsShowTodo] = useState(isShow)

  return (
    <div className="todo-section">
      <div className="head row between">
        <div className="row title-wrapper">
          <div className="title">{title}</div>
          <div className="add-btn">Add</div>
        </div>
        <div className="toggle">
          <i
            className={'f7-icons ' + (isShowTodo ? 'up' : 'down')}
            onClick={() => {
              setIsShowTodo(!isShowTodo)
            }}
          >
            chevron_up
          </i>
        </div>
      </div>
      <div className={'todo-container ' + (!isShowTodo ? 'dp-none' : '')}>
        {todoList.map((todo) => (
          <Todo {...todo} key={todo.id}></Todo>
        ))}
      </div>
    </div>
  )
}
