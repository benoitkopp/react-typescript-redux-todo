import TodoForm from '../TodoForm'
import { renderWithProviders } from '../../../utils/test-utils'
import { fireEvent } from '@testing-library/react'

test('submit a new task', () => {
  const { store, getByTestId } = renderWithProviders(<TodoForm />)

  const input = getByTestId('task-input')
  expect(input).toBeInTheDocument()

  fireEvent.change(input, { target: { value: 'New Test Task' } })
  fireEvent.submit(getByTestId('task-form'))

  expect(store.getState().todos.todos).toEqual([
    expect.objectContaining({
      description: 'New Test Task',
      completed: false,
    }),
  ])
})
