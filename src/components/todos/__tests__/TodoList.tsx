import TodoList from '../TodoList'
import { renderWithProviders } from '../../../utils/test-utils'
import {
  TodosState,
  VisibilityFilter,
} from '../../../features/todos/todosSlice'
import { within } from '@testing-library/react'

describe('list the todos', () => {
  test('all', () => {
    const initialTodos: TodosState = {
      todos: [
        { id: 'task-1', description: 'Task 1', completed: false },
        { id: 'task-2', description: 'Task 2', completed: false },
      ],
      visibilityFilter: VisibilityFilter.all,
    }

    const { getAllByTestId } = renderWithProviders(<TodoList />, {
      preloadedState: {
        todos: initialTodos,
      },
    })

    const items = getAllByTestId('todo-item')

    expect(items.length).toEqual(2)
    expect(within(items[0]).getByText('Task 1')).toBeInTheDocument()
    expect(within(items[1]).getByText('Task 2')).toBeInTheDocument()
  })

  test('filtered by completed', () => {
    const initialTodos: TodosState = {
      todos: [
        { id: 'task-1', description: 'Task 1', completed: false },
        { id: 'task-2', description: 'Task 2', completed: true },
      ],
      visibilityFilter: VisibilityFilter.completed,
    }

    const { getAllByTestId } = renderWithProviders(<TodoList />, {
      preloadedState: {
        todos: initialTodos,
      },
    })

    const items = getAllByTestId('todo-item')

    expect(items.length).toEqual(1)
    expect(within(items[0]).getByText('Task 2')).toBeInTheDocument()
  })
})
