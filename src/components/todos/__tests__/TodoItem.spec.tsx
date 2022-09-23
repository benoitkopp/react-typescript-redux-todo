import TodoItem from '../TodoItem'
import { renderWithProviders } from '../../../utils/test-utils'
import {
  TodosState,
  VisibilityFilter,
} from '../../../features/todos/todosSlice'
import { fireEvent } from '@testing-library/react'
import { Todo } from '../../../models/Todo'

describe('show the todo item', () => {
  const initialTodos: TodosState = {
    todos: [
      { id: 'task-1', description: 'Task 1', completed: false },
      { id: 'task-2', description: 'Task 2', completed: false },
    ],
    visibilityFilter: VisibilityFilter.all,
  }

  test('present', () => {
    const todo: Todo = { id: 'task-1', description: 'Task 1', completed: false }

    const { getByText } = renderWithProviders(<TodoItem todo={todo} />)

    expect(getByText('Task 1')).toBeInTheDocument()
  })

  test('remove item', () => {
    const { store, getByTestId } = renderWithProviders(
      <TodoItem todo={initialTodos.todos[1]} />,
      {
        preloadedState: {
          todos: initialTodos,
        },
      },
    )

    const trash = getByTestId('remove-todo-item')
    fireEvent.click(trash)

    expect(store.getState().todos.todos).toEqual([
      { id: 'task-1', description: 'Task 1', completed: false },
    ])
  })

  test('toggle item', () => {
    const { store, getByTestId } = renderWithProviders(
      <TodoItem todo={initialTodos.todos[1]} />,
      {
        preloadedState: {
          todos: initialTodos,
        },
      },
    )

    const item = getByTestId('todo-item')
    fireEvent.click(item)

    expect(store.getState().todos.todos[1]).toEqual({
      id: 'task-2',
      description: 'Task 2',
      completed: true,
    })
  })
})
