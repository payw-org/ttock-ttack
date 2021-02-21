import React from 'react'
import './style.scss'
import { RestaurantMap } from '@/components/Restaurant/RestaurantMap/index'
import { RestaurantSearchBar } from '@/components/Restaurant/RestaurantSearch/index'
import { RestaurantInfo } from '@/components/Restaurant/RestaurantInfo/index'
import { RestaurantTab } from '@/components/Restaurant/RestaurantTab/index'

export const Restaurent: React.FC<{}> = ({}) => {
  return (
    <div className="restaurent">
      <div className="left">
        <RestaurantSearchBar />
        <RestaurantInfo />
        <RestaurantTab />
      </div>
      <div className="right">
        <RestaurantMap />
      </div>
    </div>
  )
}
