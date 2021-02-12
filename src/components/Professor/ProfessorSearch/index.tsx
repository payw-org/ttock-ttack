import React, {useState} from 'react'
import './style.scss'

export interface SearchBarProps {
  filterSelector: (value: string) => void
}

export const SearchBar: React.FC<SearchBarProps>= ({ filterSelector }) => {
    const [professorInput, setProfessorInput] = useState("");
  
    const handleInput = (e) => {
      setProfessorInput(e.target.value);
    };
  
    const enterkey = (e) => {
      if (e.keyCode == 13) {
        filterSelector(e.target.value);
      }
    };

    const clickInput = () => {
      filterSelector(professorInput);
    }
  return (
    <>
      <input
          onChange={handleInput}
          type="text"
          placeholder="Search"
          value={professorInput}
          onKeyUp={enterkey}
        ></input>
      <img src="/images/search.svg" className="search-icon" alt="search" onClick={clickInput}/>
    </>
  )
}
