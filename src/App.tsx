import React from 'react'
import { Timer } from '@/components/Timer'
import { SideMenuBar } from '@/components/SideMenuBar'
import { testBookmarkList, testDateTime } from './utils/mock-data'
import '@/style/fonts.scss'
import '@/style/global.scss'

function App() {
  return (
    <div>
      <Timer dateTime={testDateTime} />
      <SideMenuBar bookmarkList={testBookmarkList} />
    </div>
  )
}

export default App
