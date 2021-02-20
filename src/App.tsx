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
      <Store>
        <MainSection />
        <SideMenuBar />
        <TodoContainer />
      </Store>
    </>
  )
}

export default App
