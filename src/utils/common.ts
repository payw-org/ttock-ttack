export const getFirstChildHeight = (element: HTMLElement) => {
  const firstChild = element.firstElementChild! as HTMLElement
  const cloneChild = firstChild.cloneNode(true) as HTMLElement
  cloneChild.style.visibility = 'hidden'

  element.appendChild(cloneChild)
  const height = cloneChild.offsetHeight
  cloneChild.remove()

  return height
}

export const getHostFromUrl = (url: string): string => {
  return url
    .replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .split('/')[0]
}
