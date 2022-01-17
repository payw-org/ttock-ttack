import React, { useState } from 'react'
import { useStore } from '@/store'

import { ProfessorCard } from '@/components/Professor/ProfessorCard'
import { SearchBar } from '@/components/Professor/ProfessorSearch'
import { SelectorBar } from '@/components/Professor/ProfessorSelector'
import { ProfessorCardProps } from '@/components/Professor/ProfessorCard'
import './style.scss'

export type ProfessorProps = {
  professorsList: ProfessorCardProps[]
}

export const Professor: React.FC<ProfessorProps> = ({}) => {
  const {
    store: { professorsList },
  } = useStore()

  const [professorCard, setProfessorCard] = useState(professorsList)
  const professorSchool = professorsList.map((professor) => professor.school)
  const professorDepartment = professorsList.map(
    (professor) => professor.department
  )
  const changeProfessorSchool = (school) => {
    setProfessorCard(
      professorsList.filter((professor) => professor.school === school)
    )
  }

  const changeProfessorDepartment = (department) => {
    setProfessorCard(
      professorsList.filter((professor) => professor.department === department)
    )
  }

  const searchComment = (search) => {
    setProfessorCard(
      professorsList.filter(
        (professor) =>
          professor.school.indexOf(search) > -1 ||
          professor.department.indexOf(search) > -1 ||
          professor.name.indexOf(search) > -1
      )
    )
  }

  return (
    <div className="search-professor-menu">
      <div className="search-bar">
        <SearchBar filterSelector={searchComment}></SearchBar>
      </div>
      <div className="select-bar">
        <SelectorBar
          selector={[...new Set(professorSchool)]}
          filterSelector={changeProfessorSchool}
        ></SelectorBar>
        <SelectorBar
          selector={[...new Set(professorDepartment)]}
          filterSelector={changeProfessorDepartment}
        ></SelectorBar>
      </div>
      <div className="profess-info">
        {professorCard.map((professor) => (
          <ProfessorCard
            key={professor.id}
            professor={professor}
          ></ProfessorCard>
        ))}
      </div>
    </div>
  )
}
