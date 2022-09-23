import VisibilityButton from '../VisibilityButton'
import { renderWithProviders } from '../../../utils/test-utils'
import {
  TodosState,
  VisibilityFilter,
} from '../../../features/todos/todosSlice'
import { fireEvent } from '@testing-library/react'
// import { Todo } from '../../../models/Todo'

describe('visibility filter button', () => {
  const initialTodos: TodosState = {
    todos: [],
    visibilityFilter: VisibilityFilter.all,
  }

  test('display the button', () => {
    const { getByText } = renderWithProviders(
      <VisibilityButton visibilityFilter={VisibilityFilter.all}>
        All
      </VisibilityButton>,
      {
        preloadedState: {
          todos: initialTodos,
        },
      },
    )

    const button = getByText('All')

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-blue-600 text-white')
  })

  test('set a new visibility filter', () => {
    const { store, getByText } = renderWithProviders(
      <VisibilityButton visibilityFilter={VisibilityFilter.active}>
        Active
      </VisibilityButton>,
      {
        preloadedState: {
          todos: initialTodos,
        },
      },
    )

    const button = getByText('Active')
    fireEvent.click(button)

    expect(store.getState().todos.visibilityFilter).toEqual(
      VisibilityFilter.active,
    )
  })
})
