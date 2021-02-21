export function getDDay(dateTime: Date): number[] {
  const [restDay, hour, minute, second] = [
    Math.floor(dateTime.getTime() / (1000 * 60 * 60 * 24)),
    dateTime.getUTCHours(),
    dateTime.getUTCMinutes(),
    dateTime.getUTCSeconds(),
  ]
  return [restDay, hour, minute, second]
}

export function getTwoDigit(number: number | string): string {
  return +number === 0 ? '00' : +number < 10 ? `0${+number}` : `${+number}`
}

export function getFormattedDate(date: Date, format: string): string {
  const [year, month, day, hour, minute, second] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ]
  const DATE_FORMAT = {
    YYYY: year,
    YY: year % 100,
    MM: getTwoDigit(month),
    M: month,
    DD: getTwoDigit(day),
    D: day,
    hh: getTwoDigit(hour),
    h: hour,
    mm: getTwoDigit(minute),
    m: minute,
    ss: getTwoDigit(second),
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

export function getCurrentDate(): [string, number, number, number] {
  const date = new Date()
  const state = date.toLocaleTimeString().split(' ')[0] === '오전' ? 'AM' : 'PM'

  const dateFormat = (num):number => {
    return num< 10 ? `0${num}` : num.toString()
  }

  const [hour, minute, second] = [
    state === 'AM' ? dateFormat(date.getHours()) : dateFormat(date.getHours()-12),
    dateFormat(date.getMinutes()),
    dateFormat(date.getSeconds())
  ]

  return [state, hour, minute, second]
}
