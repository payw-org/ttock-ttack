import React, { useEffect, useRef } from 'react'
import { useStore } from '@/store'
import { getFirstChildHeight } from '@/utils/common'
import { TodoSection } from './TodoSection'
import './style.scss'

export const TodoContainer: React.FC = () => {
  const {
    store: { todoSectionList, toggleConfig, todoList },
    dispatchStore,
  } = useStore()
  const sectionContiner = useRef<HTMLDivElement>(null)

  const setSectionContainerHeight = () => {
    if (!sectionContiner.current) return

    sectionContiner.current.style.height = toggleConfig.todo
      ? `${getFirstChildHeight(sectionContiner.current)}px`
      : '0'
  }

  useEffect(() => {
    setSectionContainerHeight()
  }, [toggleConfig.todo, todoList, todoSectionList])

  const toggleContainer = () => {
    dispatchStore('toggleConfig', { ...toggleConfig, todo: !toggleConfig.todo })
  }

  return (
    <div
      className={'todo-container ' + (toggleConfig.todo ? 'minus' : 'plus')}
      data-component=""
    >
      <div className="row between title-wrapper">
        <div className="title">To Do List</div>
        <div className="toggle-btn" onClick={toggleContainer}>
          <i className="f7-icons plus">plus_square</i>
          <i className="f7-icons minus">minus_square</i>
        </div>
      </div>
      <div className="section-container" ref={sectionContiner}>
        <div>
          {todoSectionList.map((todoSection) => (
            <TodoSection {...todoSection} key={todoSection.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
