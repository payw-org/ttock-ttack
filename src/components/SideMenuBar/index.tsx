import React, { useState } from 'react'
import { useStore } from '@/store'
import { Bookmark } from '@/components/common/Bookmark'
import { AddBookmark } from '@/components/common/AddBookmark'
import './style.scss'

const MAX_BOOKMARK = 8

export const SideMenuBar: React.FC = () => {
  const {
    store: { bookmarkList },
  } = useStore()
  const [isShow, setIsShow] = useState(false)

  return (
    <div
      className={'side-menu-bar ' + (isShow ? 'show' : '')}
      data-component=""
      onMouseEnter={() => {
        setIsShow(true)
      }}
      onMouseLeave={() => {
        setIsShow(false)
        document.body.click()
      }}
    >
      <div className="bookmark-container">
        {bookmarkList.map((bookmark) => (
          <Bookmark {...bookmark} key={bookmark.id}></Bookmark>
        ))}
        {bookmarkList.length < MAX_BOOKMARK ? (
          <AddBookmark category="side" />
        ) : (
          <></>
        )}
      </div>
      <button className="developer">개발자 소개</button>
    </div>
  )
}
