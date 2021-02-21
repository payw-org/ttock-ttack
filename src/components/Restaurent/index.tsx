import React from 'react'
import './style.scss'
import { RestaurantMap } from '@/components/Restaurent/RestarentMap/index'

export const Restaurent: React.FC<{}> = ({}) => {
  return (
    <div className="restaurent">
      <RestaurantMap></RestaurantMap>
    </div>
  )
}
