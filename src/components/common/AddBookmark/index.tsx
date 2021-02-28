import React from 'react'
import { useStore } from '@/store'
import './style.scss'
import { BookmarkProps } from '../Bookmark'

export type AddBookmarkProps = {
  category: string
  size?: number
}

export const AddBookmark: React.FC<AddBookmarkProps> = ({ category, size }) => {
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
    <div
      className="add-bookmark"
      data-component=""
      style={
        size
          ? {
              width: `${size}rem`,
              fontSize: `${size}rem`,
            }
          : {}
      }
    >
      <i className="f7-icons" onClick={addEditBookmark}>
        plus
      </i>
    </div>
  )
}
