import React from 'react'
import { Store } from '@/store'
import { Timer } from '@/components/Timer'
import { SideMenuBar } from '@/components/SideMenuBar'
import { TodoContainer } from '@/components/TodoContainer'
import '@/style/fonts.scss'
import '@/style/global.scss'

const App: React.FC = () => {
  return (
    <Store>
      <div id="bg" style={{ backgroundImage: 'url("images/bg/2.jpg")' }}></div>
      <Timer />
      <SideMenuBar />
      <TodoContainer />
    </Store>
  )
}

export default App
