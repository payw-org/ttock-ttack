/*global kakao */
import React, { useEffect } from 'react'

declare global {
  interface Window {
    kakao: any
  }
}

export const RestaurantMap: React.FC = () => {
  useEffect(() => {
    RestaurantKakaoMap()
  }, [])

  const RestaurantKakaoMap = () => {
    let container = document.getElementById('map')
    let options = {
      center: new window.kakao.maps.LatLng(
        37.624915253753194,
        127.15122688059974
      ),
      level: 5,
    }
    //map
    const map = new window.kakao.maps.Map(container, options)

    //마커가 표시 될 위치
    let markerPosition = new window.kakao.maps.LatLng(
      37.62197524055062,
      127.16017523675508
    )

    // 마커를 생성
    let marker = new window.kakao.maps.Marker({
      position: markerPosition,
    })

    // 마커를 지도 위에 표시
    marker.setMap(map)
  }

  return <div id="map" style={{ width: '100vw', height: '100vh' }}></div>
}
