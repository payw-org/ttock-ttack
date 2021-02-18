import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useStore } from '@/store'
import { getFormattedDate } from '@/utils/time'
import './style.scss'

export interface TodoProps {
  sectionId: number
  id: number
  title: string
  dueDate: Date
  isMain: boolean
  isEdit?: boolean
  isNew?: boolean
}

export const Todo: React.FC<TodoProps> = ({
  id,
  title,
  dueDate,
  isMain,
  isEdit,
}) => {
  const {
    store: { todoList },
    dispatchStore,
  } = useStore()
  const thisTodo = useMemo(() => todoList.find((todo) => todo.id === id), [
    isEdit,
  ])

  const menu = useRef<HTMLDivElement>(null)
  const [isShowMenu, setIsShowMenu] = useState(false)
  useEffect(() => {
    return () => setIsShowMenu(false)
  }, [])

  const closeMenu = useCallback((e) => {
    const todoComponent = e.target.closest('.todo')
    if (todoComponent && +todoComponent.dataset.component === id) {
      return
    }

    setIsShowMenu(false)
    window.removeEventListener('click', closeMenu)
  }, [])

  const toggleMenu = (e) => {
    if (!isShowMenu) {
      window.addEventListener('click', closeMenu)
    } else {
      window.removeEventListener('click', closeMenu)
    }

    setIsShowMenu(!isShowMenu)
  }

  const editTodo = () => {
    if (!thisTodo) return

    thisTodo.isEdit = true
    dispatchStore('todoList', [...todoList])
  }

  const deleteTodo = () => {
    if (!thisTodo) return

    dispatchStore(
      'todoList',
      todoList.filter((todo) => todo.id !== id)
    )
  }

  return (
    <div className="todo" data-component={id}>
      <div className="row between">
        <div className="title-wrapper">
          <h3 className="title">{title}</h3>
          <div className={'star' + (isMain ? 'main' : '')}></div>
        </div>
        <div className="menu-section">
          <i className="f7-icons menu-btn" onClick={toggleMenu}>
            ellipsis_vertical
          </i>
          {isShowMenu ? (
            <div className="menu-wrapper" ref={menu}>
              <button className="menu">완료</button>
              <button className="menu" onClick={editTodo}>
                수정
              </button>
              <button className="menu" onClick={deleteTodo}>
                삭제
              </button>
            </div>
          ) : (
            <></>
          )}
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
