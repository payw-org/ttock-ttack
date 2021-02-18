export const getFirstChildHeight = (element: HTMLElement) => {
  const firstChild = element.firstElementChild! as HTMLElement
  const cloneChild = firstChild.cloneNode(true) as HTMLElement
  cloneChild.style.visibility = 'hidden'

  element.appendChild(cloneChild)
  const height = cloneChild.offsetHeight
  cloneChild.remove()

  return height
}
