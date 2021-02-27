import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { BookmarkProps } from '@/components/common/Bookmark'
import { TodoSectionProps } from '@/components/TodoContainer/TodoSection'
import { TodoProps } from '@/components/TodoContainer/TodoSection/Todo'
import { getMainTodo, sortTodoList } from './functions'

export type Toggle = {
  todo: boolean
}

export type StoreType = {
  bookmarkList: BookmarkProps[]
  editedBookmark?: BookmarkProps
  todoSectionList: TodoSectionProps[]
  todoList: TodoProps[]
  toggleConfig: Toggle
  mainTodo: TodoProps
}

type DerivedType = {
  mainTodo: TodoProps
}

type WritableType = {
  [K in Exclude<keyof StoreType, keyof DerivedType>]: StoreType[K]
}

const preProccess = (key: keyof WritableType, store: StoreType): StoreType => {
  let newStore = { ...store }

  switch (key) {
    case 'todoList':
      newStore.todoList = sortTodoList(newStore.todoList)
      newStore.mainTodo = getMainTodo(newStore.todoList)
      break
  }

  return newStore
}

const StoreContext = createContext<StoreType | undefined>(undefined)
const SetStoreContext = createContext<
  React.Dispatch<React.SetStateAction<StoreType | undefined>> | undefined
>(undefined)

export const useStore = () => {
  const store = useContext(StoreContext)
  const setStore = useContext(SetStoreContext)
  if (store === undefined || setStore === undefined) {
    throw new Error('Store is not initialized')
  }

  function dispatchStore<K extends keyof WritableType>(
    key: K,
    newValue: StoreType[K]
  ) {
    if (store === undefined || setStore === undefined) return

    store[key] = newValue
    setStore({ ...preProccess(key, store) })
  }

  return { store, dispatchStore }
}

const getInitStore = async (): Promise<StoreType> => {
  const timeDelay = new Promise<{
    data: WritableType
  }>((resolve) => {
    setTimeout(() => {
      resolve(axios.get('/data/data.json'))
    }, 300)
  })
  const response = await timeDelay // will be deleted code
  // const response = await axios.get('/data/data.json')

  response.data.todoList = response.data.todoList.map((todo) => ({
    ...todo,
    dueDate: new Date(todo.dueDate),
  }))

  const derivedStore: DerivedType = {
    mainTodo: getMainTodo(response.data.todoList),
  }

  return (Object.keys(response.data) as Array<keyof WritableType>).reduce(
    (reducedStore: StoreType, key) => {
      return { ...preProccess(key, reducedStore) }
    },
    { ...response.data, ...derivedStore }
  )
}

export const Store: React.FC = (props) => {
  const [store, setStore] = useState<StoreType>()

  useEffect(() => {
    const fetchInitStore = async () => {
      const defaultStore: StoreType = await getInitStore()
      setStore(defaultStore)
    }
    fetchInitStore()
  }, [])

  return (
    <StoreContext.Provider value={store}>
      <SetStoreContext.Provider value={setStore}>
        {store !== undefined ? props.children : <></>}
      </SetStoreContext.Provider>
    </StoreContext.Provider>
  )
}
