import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { BookmarkProps } from '@/components/common/Bookmark'
import { TodoSectionProps } from '@/components/TodoContainer/TodoSection'
import { TodoProps } from '@/components/TodoContainer/TodoSection/Todo'

export type Toggle = {
  todo: boolean
}

export type StoreType = {
  sideBookmarkList: BookmarkProps[]
  mainDate: Date
  todoSectionList: TodoSectionProps[]
  todoList: TodoProps[]
  toggleConfig: Toggle
}

const preProccess = (key: keyof StoreType, store: StoreType): StoreType => {
  if (key === 'todoList') {
    store.todoList.sort((a, b) => {
      return a.dueDate > b.dueDate
        ? 1
        : a.dueDate < b.dueDate
        ? -1
        : a.title > b.title
        ? 1
        : a.id > b.id
        ? 1
        : -1
    })
  }
  return store
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

  function dispatchStore<K extends keyof StoreType>(
    key: K,
    newValue: StoreType[K]
  ) {
    if (store === undefined || setStore === undefined) return

    store[key] = newValue
    const newStore = { ...preProccess(key, store) }

    setStore(newStore)
  }

  return {
    store,
    dispatchStore,
  }
}

const getInitStore = async (): Promise<StoreType> => {
  const response = await axios.get('/data/data.json')

  const defaultStore: StoreType = {
    ...response.data,
    todoList: response.data.todoList.map((todo) => ({
      ...todo,
      dueDate: new Date(todo.dueDate),
    })),
    mainDate: new Date(response.data.mainDate),
  }

  return (Object.keys(defaultStore) as Array<keyof StoreType>).reduce(
    (reducedStore, key) => {
      return { ...preProccess(key, reducedStore) }
    },
    defaultStore
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
