import React from 'react'
import { useSelector, shallowEqual, useDispatch } from "react-redux"

import { router, user } from "./data/rootActions"
import { Dispatch } from "redux"

function App() {
  const users: readonly User[] = useSelector(
    (state: UserState) => state.users,
    shallowEqual
  )

  const dispatch: Dispatch<any> = useDispatch()
  
  return <div>hello world</div>
}

export default App
