import React, { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import ko from 'date-fns/locale/ko'
import { useStore } from '@/store'
import { LENGTH } from '@/utils/constants'
import { autoScaleInputHandler } from '@/utils/events'
import { getFormattedDate, getTwoDigit } from '@/utils/time'
import { TodoProps } from '../Todo'
import { TimeInput } from './TimeInput'
import './style.scss'
import 'react-datepicker/dist/react-datepicker.css'

export const TodoEdit: React.FC<TodoProps> = (props) => {
  const {
    store: { todoList },
    dispatchStore,
  } = useStore()
  const thisTodo = todoList.find((todo) => todo.id === props.id)

  const thisComponent = useRef<HTMLDivElement>(null)
  const datePicker = useRef<
    HTMLDivElement & {
      onInputClick: () => void
      input: HTMLInputElement
    }
  >()

  const [title, setTitle] = useState<string>(props.title)
  const [date, setDate] = useState<Date>(props.dueDate)
  const [hour, setHour] = useState<string>(
    getTwoDigit(props.dueDate.getHours())
  )
  const [minute, setMinute] = useState<string>(
    getTwoDigit(props.dueDate.getMinutes())
  )

  useEffect(() => {
    const inputs:
      | NodeListOf<HTMLInputElement>
      | undefined = thisComponent.current?.querySelectorAll('.date-row input')
    inputs?.forEach((input) => {
      autoScaleInputHandler({ target: input })
    })
  }, [thisComponent])

  const inputTitle = (e) => {
    if (e.target.value.length > LENGTH.MAX_TODO_TITLE) return
    setTitle(e.target.value)
  }

  const changeDate = (newDate) => {
    setDate(newDate)
    setTimeout(() => {
      if (datePicker.current?.input) {
        autoScaleInputHandler({ target: datePicker.current?.input })
      }
    }, 0)
  }

  const saveTodo = () => {
    if (!thisTodo || title === '') return

    thisTodo.isEdit = false
    thisTodo.isNew = false
    thisTodo.title = title
    thisTodo.dueDate = new Date(
      `${getFormattedDate(date, 'YYYY-MM-DD')} ${hour}:${minute}:00`
    )
    dispatchStore('todoList', [...todoList])
  }

  const cancelTodo = () => {
    if (props.isNew) {
      dispatchStore(
        'todoList',
        todoList.filter((todo) => todo.id !== props.id)
      )
      return
    }

    if (!thisTodo) return
    thisTodo.isEdit = false
    dispatchStore('todoList', [...todoList])
  }

  return (
    <div className="todo-edit" data-component="" ref={thisComponent}>
      <div className="row between title-input-row">
        <input placeholder="To do" value={title} onInput={inputTitle} />
        <i className="f7-icons star">star_fill</i>
      </div>
      <div className="row date-row">
        <i
          className="f7-icons calendar"
          onClick={() => {
            datePicker.current?.onInputClick()
          }}
        >
          calendar
        </i>
        <DatePicker
          ref={datePicker}
          dateFormat="yyyy.MM.dd"
          selected={date}
          onChange={(newDate) => {
            changeDate(newDate)
          }}
          placeholderText="YYYY.MM.DD"
          locale={ko}
        />
        <div className="time-input-wrapper">
          <TimeInput
            className="hour"
            value={hour}
            setValue={setHour}
          ></TimeInput>
          <span className="colon">:</span>
          <TimeInput
            className="minute"
            value={minute}
            setValue={setMinute}
          ></TimeInput>
        </div>
      </div>
      <div className="row button-row">
        <button className="cancel" onClick={cancelTodo}>
          Cancel
        </button>
        <button
          className={'save ' + (title !== '' ? 'active' : '')}
          onClick={saveTodo}
        >
          Save
        </button>
      </div>
    </div>
  )
}
