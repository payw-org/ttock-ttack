import React from 'react'
import { useStore } from '@/store'
import './style.scss'
import { BookmarkProps } from '../Bookmark'

export type AddBookmarkProps = {
  category: string
}

export const AddBookmark: React.FC<AddBookmarkProps> = ({ category }) => {
  const { dispatchStore } = useStore()
  const defaultBookmark: BookmarkProps = {
    id: 0,
    name: '',
    url: '',
    image: '',
    category,
  }

  const addEditBookmark = () => {
    dispatchStore('editedBookmark', { ...defaultBookmark })
  }

  return (
    <div className="add-bookmark" data-component="">
      <i className="f7-icons" onClick={addEditBookmark}>
        plus
      </i>
    </div>
  )
}
