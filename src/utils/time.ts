export function getDDay(dateTime: Date): number[] {
  const [restDay, hour, minute, second] = [
    Math.floor(dateTime.getTime() / (1000 * 60 * 60 * 24)),
    dateTime.getUTCHours(),
    dateTime.getUTCMinutes(),
    dateTime.getUTCSeconds(),
  ]
  return [restDay, hour, minute, second]
}

export function getFormattedDate(date: Date, format: string): string {
  const [year, month, day, hour, minute, second] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  ]
  const DATE_FORMAT = {
    YYYY: year,
    YY: year % 100,
    MM: month < 10 ? `0${month}` : month,
    M: month,
    DD: day < 10 ? `0${day}` : day,
    D: day,
    hh: hour < 10 ? `0${hour}` : hour,
    h: hour,
    mm: minute < 10 ? `0${minute}` : minute,
    m: minute,
    ss: second < 10 ? `0${second}` : second,
    s: second,
  }

  let formattedDate = format
  for (let key in DATE_FORMAT) {
    formattedDate = formattedDate.replace(
      new RegExp(key, 'g'),
      DATE_FORMAT[key]
    )
  }

  return formattedDate
}
