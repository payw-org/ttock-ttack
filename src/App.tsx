import React, { useEffect, useRef, useState } from 'react'
import { Timer } from '@/components/Timer'
import { SideMenuBar } from '@/components/SideMenuBar'
import { testBookmarkList, testDateTime } from './utils/mock-data'
import '@/style/fonts.scss'
import '@/style/global.scss'
import axios from 'axios'

type Data = {
  sideBookmarkList: Array<any>
  mainDate: string
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
      setData(fetchedData)
    }
    fetchData()
  }, [])

  return (
    <div>
      {data ? (
        <>
          <Timer dateTime={new Date(data.mainDate)} />
          <SideMenuBar bookmarkList={data.sideBookmarkList} />
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default App
