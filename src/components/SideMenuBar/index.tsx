import React from 'react'
import { Bookmark, BookmarkProps } from '@/components/common/Bookmark'
import './style.scss'

export interface SideMenuBarProps {
  bookmarkList: BookmarkProps[]
}

export const SideMenuBar: React.FC<SideMenuBarProps> = ({ bookmarkList }) => {
  return (
    <div className="side-menu-bar">
      <div className="bookmark-container">
        {bookmarkList.map((bookmark) => (
          <Bookmark {...bookmark} key={bookmark.id}></Bookmark>
        ))}
      </div>
      <button className="developer">개발자 소개</button>
    </div>
  )
}
