import React from 'react'
import './style.scss'

export interface BookmarkProps {
  id: number
  name: string
  url: string
  image: string
}

export const Bookmark: React.FC<BookmarkProps> = ({ name, url, image }) => {
  return (
    <div className="bookmark">
      <a href={url} target="_blank">
        <img loading="lazy" src={image} alt={name} />
        <div className="name">{name}</div>
      </a>
    </div>
  )
}
