export function getPosition(): number[] {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let [lat, long] = [position.coords.latitude, position.coords.longitude]
      return [lat, long]
    },
    (error) => {
      console.log(error)
    }
  )
}
