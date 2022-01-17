import React, { useState } from 'react'
import './style.scss'

const API_KEY = 'dc45d86814337b06efe773c9d5a6a9a6'

export const Weather = () => {
  const [initialData, setInitialData] = useState({
    lat: 0,
    long: 0,
    temperature: 0,
    name: '',
    icon: '',
  })

  const getPosition = () => {
    const options = {
      timeout: 10000,
      enableHighAccuracy: true,
      maximumAge: 0,
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setInitialData({
            ...initialData,
            lat: position.coords.latitude,
            long: position.coords.longitude,
          })
        },
        (error) => {
          console.log(error)
        },
        options
      )
    }

    getWeather()
  }

  const getWeather = () => {
    const { lat, long } = initialData

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        setInitialData({
          ...initialData,
          temperature: Math.floor(json.main.temp - 273.15),
          name: json.weather[0].main,
          icon: json.weather[0].icon,
        })
      })
  }

  getPosition()

  const { temperature, name, icon } = initialData
  const img_url = `http://openweathermap.org/img/w/${icon}.png`

  return (
    <>
      <h1>오늘의 날씨</h1>
      <img alt="weather_icon" src={img_url} />
      <h3>온도 : {temperature}°C</h3>
      <h3>날씨 : {name}</h3>
    </>
  )
}

export default Weather
