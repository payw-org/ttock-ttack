import React from 'react'
import './style.scss'

export const RestaurantHome: React.FC<{}> = () => {
  return (
    <div className="restaurant-home">
      <ul>
        <li className="item">
          <i className="f7-icons home-icon">phone</i>
          010-1234-4567
        </li>
        <li className="item">
          <i className="f7-icons home-icon">placemark</i>서울 동작구 흑석로 83
        </li>
        <li className="item">
          <i className="f7-icons home-icon">alarm</i>매일 11:00 ~ 23:00
        </li>
        <li className="item">
          <i className="f7-icons home-icon">doc_plaintext</i>김치철판볶음밥 등
          최고의 맛집
        </li>
      </ul>
    </div>
  )
}
