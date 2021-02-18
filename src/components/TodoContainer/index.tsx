import React from 'react'
import { useStore } from '@/store'
import { TodoSection } from './TodoSection'
import './style.scss'

export const TodoContainer: React.FC = () => {
  const {
    store: { todoSectionList, toggleConfig },
    dispatchStore,
  } = useStore()

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
      <div
        className={'section-container ' + (!toggleConfig.todo ? 'dp-none' : '')}
      >
        {todoSectionList.map((todoSection) => (
          <TodoSection {...todoSection} key={todoSection.id} />
        ))}
      </div>
    </div>
  )
}
