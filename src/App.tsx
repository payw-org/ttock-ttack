import React from 'react'
import Timer from '@/components/Timer'

const testDateTime = new Date('2022-02-11 23:59:59')

function App() {
  return (
    <div>
      <Timer dateTime={testDateTime} />
    </div>
  )
}

export default App
