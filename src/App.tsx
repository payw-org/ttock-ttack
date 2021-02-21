import React from 'react'
import { Store } from '@/store'
import { MainSection } from '@/components/MainSection'
import { SideMenuBar } from '@/components/SideMenuBar'
import { TodoContainer } from '@/components/TodoContainer'
import '@/style/fonts.scss'
import '@/style/global.scss'

const App: React.FC = () => {
  return (
    <>
      <div id="bg" style={{ backgroundImage: 'url("images/bg/1.jpg")' }}>
        <img id="bg-overlay" src="images/bg/overlay.png"></img>
      </div>
      <Store>
        <MainSection />
        <SideMenuBar />
        <TodoContainer />
      </Store>
    </>
  )
}

export default App
