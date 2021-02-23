import React, { useEffect, useState } from 'react'
import './style.scss'
import { getHostFromUrl } from '@/utils/common'
import { useStore } from '@/store'

export const BookmarkEditor: React.FC = () => {
  const {
    store: { editBookmark },
    dispatchStore,
  } = useStore()

  const [name, setName] = useState(editBookmark ? editBookmark.name : '')
  const [url, setUrl] = useState(editBookmark ? editBookmark.url : '')

  useEffect(() => {
    if (name || !url) return

    setName(getHostFromUrl(url))
  }, [url])

  useEffect(() => {
    if (!editBookmark) return

    setName(editBookmark.name)
    setUrl(editBookmark.url)
  }, [editBookmark])

  const inputHandler = (e, setFunc) => {
    setFunc(e.target.value)
  }

  const cancelEdit = () => {
    dispatchStore('editBookmark', undefined)
  }

  return editBookmark ? (
    <div className="bookmark-editor" data-component="">
      <div className="main-container">
        <div className="title">북마크 {editBookmark.id ? '수정' : '추가'}</div>
        <div className="input-container">
          <div className="input-wrapper">
            <label htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              placeholder="중앙대학교 포탈"
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
              placeholder="https://mportal.cau.ac.kr/main.do"
              value={url}
              onInput={(e) => {
                inputHandler(e, setUrl)
              }}
            />
          </div>
        </div>
        <div className="button-row row">
          <button className="cancel" onClick={cancelEdit}>
            취소
          </button>
          <button className={'save ' + (url !== '' ? 'active' : '')}>
            저장
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
