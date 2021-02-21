import React, { useState } from 'react'
import './style.scss'
import { RestaurantHome } from '@/components/Restaurant/RestaurantHome/index'
import { RestaurantMenu } from '@/components/Restaurant/RestaurantMenu/index'
import { RestaurantPicture } from '@/components/Restaurant/RestaurantPicture/index'

export const RestaurantTab: React.FC<{}> = ({}) => {
  const [menuTab, setMenuTab] = useState('0')

  const toggleTab = (e) => {
    setMenuTab(e.getAttribute('data-value'))
  }
  return (
    <>
      <div className="restaurant-menu" onClick={(e) => toggleTab(e.target)}>
        <span
          className={`menu-tab ${menuTab === '0' ? 'selected' : ''}`}
          data-value={0}
        >
          홈
        </span>
        <span
          className={`menu-tab ${menuTab === '1' ? 'selected' : ''}`}
          data-value={1}
        >
          메뉴
        </span>
        <span
          className={`menu-tab ${menuTab === '2' ? 'selected' : ''}`}
          data-value={2}
        >
          사진
        </span>
      </div>
      <div className="contents">
        {menuTab === '0' ? <RestaurantHome></RestaurantHome> : null}
        {menuTab === '1' ? <RestaurantMenu></RestaurantMenu> : null}
        {menuTab === '2' ? <RestaurantPicture></RestaurantPicture> : null}
      </div>
    </>
  )
}
