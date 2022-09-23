import { useAppSelector } from '../../app/hooks'
import { VisibilityFilter } from '../../features/todos/todosSlice'
import { Todo } from '../../models/Todo'

import TodoItem from './TodoItem'

const TodoList = (): JSX.Element => {
  const todos = useAppSelector(state => state.todos.todos)
  const currentVisibilityFilter = useAppSelector(
    state => state.todos.visibilityFilter,
  )

  const getVisibleTodos = (
    todos: Todo[],
    currentVisibilityFilter: VisibilityFilter,
  ): Todo[] => {
    switch (currentVisibilityFilter) {
      case VisibilityFilter.active:
        return todos.filter(todo => !todo.completed)
      case VisibilityFilter.completed:
        return todos.filter(todo => todo.completed)
      case VisibilityFilter.all:
      default:
        return todos
    }
  }

  const visibleTodos = getVisibleTodos(todos, currentVisibilityFilter)

  return (
    <div data-testid="todos-list" className="flex flex-col space-y-2">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodoList
