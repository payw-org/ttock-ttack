import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '@/store'
import { getFirstChildHeight } from '@/utils/common'
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
    store: { todoSectionList, todoList },
    dispatchStore,
  } = useStore()
  const container = useRef<HTMLDivElement>(null)
  const [isShow, setIsShow] = useState(props.isShow)

  const setContainerHeight = () => {
    if (!container.current) return

    if (isShow) {
      container.current.style.overflowY = 'initial'
      container.current.style.height = `${getFirstChildHeight(
        container.current
      )}px`
      container.current.style.opacity = '1'
    } else {
      container.current.style.overflowY = 'hidden'
      container.current.style.height = '0'
      container.current.style.opacity = '0'
    }
  }

  useEffect(() => {
    setContainerHeight()
  }, [isShow, todoList])

  const toggleSection = () => {
    setIsShow(!isShow)
    dispatchStore('todoSectionList', [...todoSectionList])
  }

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
    <div className="todo-section" data-component="">
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
            onClick={toggleSection}
          >
            chevron_up
          </i>
        </div>
      </div>
      <div className="todo-container" ref={container}>
        <div>
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
    </div>
  )
}
