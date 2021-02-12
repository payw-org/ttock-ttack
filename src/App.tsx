import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Timer } from '@/components/Timer'
import { SideMenuBar } from '@/components/SideMenuBar'
import { BookmarkProps } from '@/components/common/Bookmark'
import { TodoContainer, TodoContainerProps } from '@/components/TodoContainer'
import '@/style/fonts.scss'
import '@/style/global.scss'

type Data = {
  sideBookmarkList: BookmarkProps[]
  mainDate: Date
  todoConfig: TodoContainerProps
}

const getData = async () => {
  const response = await axios.get('/data/data.json')
  return response.data
}

const App: React.FC = () => {
  const [data, setData] = useState<Data>()

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData()
      setData({ ...fetchedData, mainDate: new Date(fetchedData.mainDate) })
    }
    fetchData()
  }, [])

  return (
    <div>
      {data ? (
        <>
          <Timer dateTime={data.mainDate} />
          <SideMenuBar bookmarkList={data.sideBookmarkList} />
          <TodoContainer {...data.todoConfig} />
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default App
