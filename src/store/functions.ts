import { BookmarkProps } from '@/components/common/Bookmark'
import { TodoProps } from '@/components/TodoContainer/TodoSection/Todo'

export const sortTodoList = (todoList: TodoProps[]): TodoProps[] => {
  todoList.sort((a, b) => {
    return a.dueDate > b.dueDate
      ? 1
      : a.dueDate < b.dueDate
      ? -1
      : a.title > b.title
      ? 1
      : a.id > b.id
      ? 1
      : -1
  })

  return [...todoList]
}

export const getMainChangedTodoList = (
  todoList: TodoProps[],
  newMainTodo: TodoProps
): TodoProps[] => {
  if (!newMainTodo.isMain) return [...todoList]

  return todoList.map((todo) => {
    todo.isMain = todo.id === newMainTodo.id
    return todo
  })
}

export const getMainTodo = (todoList: TodoProps[]): TodoProps => {
  const mainTodo = todoList.find((todo) => todo.isMain)

  const now: Date = new Date()
  const defaultTodo: TodoProps = {
    sectionId: 0,
    id: 0,
    title: `${now.getFullYear()}년`,
    dueDate: new Date(`${now.getFullYear()}-12-31 23:59:59`),
    isMain: true,
  }

  return mainTodo || defaultTodo
}

export const getEditedBookmarkList = (
  bookmarkList: BookmarkProps[],
  editedBookmark: BookmarkProps
): BookmarkProps[] => {
  const editedIndex = bookmarkList.findIndex(
    (bookmark) => bookmark.id === editedBookmark.id
  )

  if (editedIndex) {
    bookmarkList[editedIndex] = { ...editedBookmark }
    return [...bookmarkList]
  }
  return [...bookmarkList, editedBookmark]
}
