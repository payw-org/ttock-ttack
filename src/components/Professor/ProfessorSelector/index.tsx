import React from 'react'
import './style.scss'

export interface SelectorBarProps {
  selector: string[]
  filterSelector: (value: string) => void
}

export const SelectorBar: React.FC<SelectorBarProps> = ({
  selector,
  filterSelector,
}) => {
  const onChangeSelect = (e) => {
    filterSelector(e.target.value)
  }

  return (
    <div className="custom-select">
      <select onChange={onChangeSelect}>
        {selector.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
      <i className="f7-icons select-arrow ">chevron_down</i>
    </div>
  )
}
