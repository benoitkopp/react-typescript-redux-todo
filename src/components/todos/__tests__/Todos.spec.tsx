import Todos from '../Todos'
import { renderWithProviders } from '../../../utils/test-utils'

test('show todos', () => {
  const { getByTestId } = renderWithProviders(<Todos />)

  expect(getByTestId('task-form')).toBeInTheDocument()
  expect(getByTestId('todos-list')).toBeInTheDocument()
})
