export const autoScaleInputHandler = ({
  target,
}: {
  target: HTMLInputElement | HTMLTextAreaElement
}) => {
  const span = document.createElement('span')
  span.style.fontSize = getComputedStyle(target).fontSize
  span.style.letterSpacing = getComputedStyle(target).letterSpacing

  span.textContent = target.value || target.placeholder
  document.body.appendChild(span)
  const width = span.offsetWidth

  span.remove()
  target.style.width = `${width}px`
}
