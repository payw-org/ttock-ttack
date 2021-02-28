import React from 'react'
import { useStore } from '@/store'
import { Bookmark } from '@/components/common/Bookmark'
import { AddBookmark } from '@/components/common/AddBookmark'
import './style.scss'

const MAX_BOOKMARK = 4

export const MainBookmarkList: React.FC = () => {
  const {
    store: { bookmarkList },
  } = useStore()

  return (
    <div className="main-bookmark-list" data-component="">
      {bookmarkList
        .filter((bookmark) => bookmark.category === 'main')
        .map((bookmark) => (
          <Bookmark {...bookmark} size={6.3} key={bookmark.id}></Bookmark>
        ))}
      {bookmarkList.filter((bookmark) => bookmark.category === 'main').length <
      MAX_BOOKMARK ? (
        <AddBookmark category="main" size={6.3} />
      ) : (
        <></>
      )}
    </div>
  )
}
