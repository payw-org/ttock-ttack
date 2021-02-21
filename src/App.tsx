import React, { useEffect, useState } from 'react'
import { Store } from '@/store'
import { MainSection } from '@/components/MainSection'
import { SideMenuBar } from '@/components/SideMenuBar'
import { TodoContainer } from '@/components/TodoContainer'
import { ProfessorCardProps } from '@/components/Professor/ProfessorCard'
import { NavBar } from '@/components/NavBar'
import '@/style/fonts.scss'
import '@/style/global.scss'
import axios from 'axios'

const getData = async () => {
  const response = await axios.get('/data/data.json')
  return response.data.professorsList
}

const App: React.FC = () => {
  const [professorsList, setProfessorsList] = useState<ProfessorCardProps[]>()

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData()
      setProfessorsList(fetchedData)
    }
    fetchData()
  }, [])

  return (
    <>
      <div id="bg" style={{ backgroundImage: 'url("images/bg/1.jpg")' }}>
        <img id="bg-overlay" src="images/bg/overlay.png"></img>
      </div>
      <Store>
        {professorsList ? <NavBar professorsList={...professorsList} /> : <></>}
        <MainSection />
        <SideMenuBar />
        <TodoContainer />
      </Store>
    </>
  )
}

export default App
