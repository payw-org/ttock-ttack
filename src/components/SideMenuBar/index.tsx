import React from 'react'
import { Bookmark, BookmarkProps } from '@/components/common/Bookmark'
import './style.scss'

interface SideMenuBarProps {
  bookmarkList: BookmarkProps[]
}

export const SideMenuBar: React.FC<SideMenuBarProps> = ({ bookmarkList }) => {
  return (
    <div className="side-menu-bar">
      <div className="bookmark-container">
        {bookmarkList.map((bookmark, index) => (
          <Bookmark {...bookmark} key={index}></Bookmark>
        ))}
      </div>
      <button className="developer">개발자 소개</button>
    </div>
  )
}
