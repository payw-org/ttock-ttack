import React, { useCallback, useRef, useState } from 'react'
import { useStore } from '@/store'
import { setElementAtCursor } from '@/utils/events'
import './style.scss'

export type BookmarkProps = {
  id: number
  name: string
  url: string
  image: string
  category: string
}

export const Bookmark: React.FC<BookmarkProps> = (props) => {
  const { dispatchStore } = useStore()
  const menuContianer = useRef<HTMLDivElement>(null)
  const [isShowMenu, setIsShowMenu] = useState(false)

  const closeMenu = useCallback((e) => {
    const bookmarkComponent = e.target.closest('.bookmark')
    if (
      bookmarkComponent &&
      +bookmarkComponent.dataset.component === props.id
    ) {
      return
    }

    setIsShowMenu(false)
    window.removeEventListener('click', closeMenu)
    window.removeEventListener('contextmenu', closeMenu)
  }, [])

  const toggleMenu = (e) => {
    e.preventDefault()
    if (!menuContianer.current) return

    setIsShowMenu(true)
    setElementAtCursor(menuContianer.current, e)
    window.addEventListener('click', closeMenu)
    window.addEventListener('contextmenu', closeMenu)
  }

  const setEditBookmark = () => {
    dispatchStore('editedBookmark', { ...props })
  }

  return (
    <div className="bookmark" data-component={props.id}>
      <a href={props.url} target="_blank">
        <img
          loading="lazy"
          src={props.image}
          alt={props.name}
          onContextMenu={toggleMenu}
        />
        <div className="name">{props.name}</div>
      </a>
      <div
        className={'menu-container ' + (isShowMenu ? 'show' : 'hide')}
        ref={menuContianer}
        onContextMenu={(e) => {
          e.preventDefault()
        }}
      >
        <div className="menu" onClick={setEditBookmark}>
          수정
        </div>
        <div className="menu">삭제</div>
      </div>
    </div>
  )
}
