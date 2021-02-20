import React from 'react'
import './style.scss'

export interface ProfessorCardProps {
  id: number
  position: string
  school: string
  department: string
  email: string
  url: string
  name: string
}

export const ProfessorCard = ({ professor }) => {
  return (
    <div className="professor-card">
      <div className="professor">
        <div className="professor-header">
          <div className="professor-header-info">
            <span className="professor-name">{professor.name}</span>
            <span className="professor-position">{professor.position}</span>
          </div>
          <a href={professor.url} target="_blank">
            <i className="f7-icons site">arrowtriangle_right_square</i>
          </a>
        </div>
        <div className="professor-school">{professor.school}</div>
        <div className="professor-department">{professor.department}</div>
        <div className="professor-email">{professor.email}</div>
      </div>
    </div>
  )
}
