import React from 'react'
import './style.scss'

export const RestaurantSearchBar: React.FC<{}> = () => {
  return (
    <div className="RestaurantSearch">
      <div className="search-wrap">
        <div className="search-bar">
          <input type="text" placeholder="Search"></input>
          <img src="/images/search.svg" className="search-icon" alt="search" />
        </div>
      </div>
    </div>
  )
}
