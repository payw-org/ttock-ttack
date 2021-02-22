import React, { useCallback, useRef, useState } from 'react'
import { setElementAtCursor } from '@/utils/events'
import './style.scss'

export type BookmarkProps = {
  id: number
  name: string
  url: string
  image: string
}

export const Bookmark: React.FC<BookmarkProps> = ({ name, url, image }) => {
  const menuContianer = useRef<HTMLDivElement>(null)
  const [isShowMenu, setIsShowMenu] = useState(false)

  const toggleMenu = (e) => {
    e.preventDefault()
    if (!menuContianer.current) return

    setIsShowMenu(true)
    setElementAtCursor(menuContianer.current, e)
  }

  return (
    <div className="bookmark" data-component={id}>
      <a href={url} target="_blank">
        <img loading="lazy" src={image} alt={name} onContextMenu={toggleMenu} />
        <div className="name">{name}</div>
      </a>
      <div
        className={'menu-container ' + (isShowMenu ? 'show' : 'hide')}
        ref={menuContianer}
        onContextMenu={(e) => {
          e.preventDefault()
        }}
      >
        <div className="menu">수정</div>
        <div className="menu">삭제</div>
      </div>
    </div>
  )
}
