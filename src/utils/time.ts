export function getDDay(dateTime: Date): number[] {
  const [restDay, hour, minute, second] = [
    Math.floor(dateTime.getTime() / (1000 * 60 * 60 * 24)),
    dateTime.getUTCHours(),
    dateTime.getUTCMinutes(),
    dateTime.getUTCSeconds(),
  ]
  return [restDay, hour, minute, second]
}
