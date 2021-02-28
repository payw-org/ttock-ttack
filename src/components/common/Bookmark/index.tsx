import React, { useCallback, useEffect, useRef, useState } from 'react'
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

export const Bookmark: React.FC<
  BookmarkProps & {
    size?: number
  }
> = (props) => {
  const {
    store: { bookmarkList },
    dispatchStore,
  } = useStore()
  const menuContianer = useRef<HTMLDivElement>(null)
  const [isShowMenu, setIsShowMenu] = useState(false)

  useEffect(() => {
    return () => {
      setIsShowMenu(false)
    }
  }, [])

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

  const deleteBookmark = (id: number) => {
    dispatchStore(
      'bookmarkList',
      bookmarkList.filter((bookmark) => bookmark.id !== id)
    )
  }

  return (
    <div
      className="bookmark"
      data-component={props.id}
      style={
        props.size
          ? {
              width: `${props.size}rem`,
              fontSize: `${props.size}rem`,
            }
          : {}
      }
    >
      <a href={props.url} target="_blank" onContextMenu={toggleMenu}>
        {props.image ? (
          <img loading="lazy" src={props.image} alt={props.name} />
        ) : (
          <div className="alt-circle">
            <span>{props.name[0]}</span>
          </div>
        )}
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
        <div
          className="menu"
          onClick={() => {
            deleteBookmark(props.id)
          }}
        >
          삭제
        </div>
      </div>
    </div>
  )
}
