import React, { useEffect, useState } from 'react'
import { Professor } from '@/components/Professor'
import { Restaurent } from '@/components/Restaurant'
import { ProfessorCardProps } from '@/components/Professor/ProfessorCard'
import { getCurrentDate } from '@/utils/time'
import './style.scss'

export type ProfessorListProps = {
  professorsList: ProfessorCardProps[]
}

export const NavBar: React.FC<ProfessorListProps> = ({ professorsList }) => {
  const [currentMenu, setCurrentMenu] = useState('')
  const [renderSwitchNum, setRenderSwitchNum] = useState(0)
  const [state, setState] = useState('')
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      const [state, hour, minute, second] = getCurrentDate()
      setState(state)
      setHour(hour)
      setMinute(minute)
      setSecond(second)
    }, 1000)
  }, [second])

  const clickNavMenu = (e) => {
    if (e.target.innerHTML === '맛집 검색') {
      setRenderSwitchNum(1)
    } else if (e.target.innerHTML === '교수 검색') {
      setRenderSwitchNum(2)
    }

    if (currentMenu === e.target.innerHTML && renderSwitchNum !== 0)
      setRenderSwitchNum(0)
    setCurrentMenu(e.target.innerHTML)
  }

  const renderSwitch = (num) => {
    switch (num) {
      case 1:
        return <Restaurent />
      case 2:
        return <Professor professorsList={professorsList} />
      default:
        return
    }
  }

  return (
    <div className="nav-bar">
      <div className="nav-bar-left">
        <div className="notice-academic">학사 공지</div>
        <div className="search-empty-classroom">빈 강의실 찾기</div>
      </div>
      <div className="nav-bar-center">
        {state} {hour}:{minute}:{second}
      </div>
      <div className="nav-bar-right">
        <div className="weather">
          🌤
          <span className="lowest"> -8℃</span> /
          <span className="best"> 14℃</span>
        </div>
        <div
          id="restaurant"
          className="search-restaurant"
          onClick={(e) => clickNavMenu(e)}
        >
          <span>맛집 검색</span>
        </div>
        <div
          id="professor"
          className="search-professor"
          onClick={(e) => clickNavMenu(e)}
        >
          <span>교수 검색</span>
        </div>
      </div>
      {renderSwitch(renderSwitchNum)}
    </div>
  )
}
