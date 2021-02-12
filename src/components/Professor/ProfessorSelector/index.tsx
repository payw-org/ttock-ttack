import React from 'react'
import './style.scss'

export const SelectorBar = ({ selector, filterSelector }) => {
  const onChangeSelect = (e) => {
    filterSelector(e.target.value);
  };

  return (
    <div className="custom-select">
      <select onChange={onChangeSelect}>
        {selector.map((name, index) => (
          <option key={index} value={name}>{name}</option>
        ))}
      </select>
    </div>
  );
};