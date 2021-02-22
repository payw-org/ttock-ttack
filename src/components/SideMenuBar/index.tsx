import React, { useState } from 'react'
import { useStore } from '@/store'
import { Bookmark } from '@/components/common/Bookmark'
import './style.scss'

export const SideMenuBar: React.FC = () => {
  const {
    store: { sideBookmarkList },
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
        {sideBookmarkList.map((bookmark) => (
          <Bookmark {...bookmark} key={bookmark.id}></Bookmark>
        ))}
      </div>
      <button className="developer">개발자 소개</button>
    </div>
  )
}
