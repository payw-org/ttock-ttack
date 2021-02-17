import React, { useState } from 'react'
import { useStore } from '@/store'
import { Todo, TodoProps } from './Todo'
import { TodoEdit } from './TodoEdit'
import './style.scss'

export type TodoSectionProps = {
  id: number
  isShow: boolean
  isAddable: boolean
  title: string
}

export const TodoSection: React.FC<TodoSectionProps> = (props) => {
  const {
    store: { todoList },
    dispatchStore,
  } = useStore()

  const [isShow, setIsShow] = useState(props.isShow)
  const defaultTodo: TodoProps = {
    sectionId: props.id,
    id: 0,
    title: '',
    dueDate: new Date(),
    isMain: false,
    isEdit: false,
  }

  const addTodo = () => {
    const newTodo: TodoProps = {
      ...defaultTodo,
      id: todoList.length + 1,
      isEdit: true,
      isNew: true,
    }
    dispatchStore('todoList', [newTodo, ...todoList])

    if (!isShow) setIsShow(true)
  }

  return (
    <div className="todo-section">
      <div className="head row between">
        <div className="row title-wrapper">
          <div className="title">{props.title}</div>
          {props.isAddable ? (
            <div className="add-btn" onClick={addTodo}>
              Add
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="toggle">
          <i
            className={'f7-icons ' + (isShow ? 'up' : 'down')}
            onClick={() => {
              setIsShow(!isShow)
            }}
          >
            chevron_up
          </i>
        </div>
      </div>
      <div className={'todo-container ' + (!isShow ? 'dp-none' : '')}>
        {todoList
          .filter((todo) => todo.sectionId === props.id && todo.isNew)
          .map((todo) => (
            <TodoEdit
              {...todo}
              sectionId={props.id}
              key={todo.id + todo.title}
            ></TodoEdit>
          ))}
        {todoList
          .filter((todo) => todo.sectionId === props.id && !todo.isNew)
          .map((todo) =>
            todo.isEdit ? (
              <TodoEdit
                {...todo}
                sectionId={props.id}
                key={todo.id + todo.title}
              ></TodoEdit>
            ) : (
              <Todo {...todo} key={todo.id + todo.title}></Todo>
            )
          )}
      </div>
    </div>
  )
}
