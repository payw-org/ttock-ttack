import React, { useEffect, useState } from 'react'
import './style.scss'
import { getHostFromUrl } from '@/utils/common'
import { useStore } from '@/store'
import { getEditedBookmarkList } from '@/store/functions'

export const BookmarkEditor: React.FC = () => {
  const {
    store: { editedBookmark, bookmarkList },
    dispatchStore,
  } = useStore()

  const [name, setName] = useState(editedBookmark ? editedBookmark.name : '')
  const [url, setUrl] = useState(editedBookmark ? editedBookmark.url : '')

  useEffect(() => {
    if (name || !url) return

    setName(getHostFromUrl(url))
  }, [url])

  useEffect(() => {
    if (!editedBookmark) return

    setName(editedBookmark.name)
    setUrl(editedBookmark.url)
  }, [editedBookmark])

  const inputHandler = (e, setFunc) => {
    setFunc(e.target.value)
  }

  const cancelEdited = () => {
    dispatchStore('editedBookmark', undefined)
  }

  const saveEdited = () => {
    if (!editedBookmark) return
    dispatchStore(
      'bookmarkList',
      getEditedBookmarkList(bookmarkList, { ...editedBookmark, name, url })
    )
    dispatchStore('editedBookmark', undefined)
  }

  return editedBookmark ? (
    <div className="bookmark-editor" data-component="">
      <div className="main-container">
        <div className="title">
          북마크 {editedBookmark.id ? '수정' : '추가'}
        </div>
        <div className="input-container">
          <div className="input-wrapper">
            <label htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              placeholder="북마크 이름"
              value={name}
              onInput={(e) => {
                inputHandler(e, setName)
              }}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="url">URL</label>
            <input
              id="url"
              type="text"
              placeholder="https://ttock-ttack.com"
              value={url}
              onInput={(e) => {
                inputHandler(e, setUrl)
              }}
            />
          </div>
        </div>
        <div className="button-row row">
          <button className="cancel" onClick={cancelEdited}>
            취소
          </button>
          <button
            className={'save ' + (url !== '' ? 'active' : '')}
            onClick={saveEdited}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
