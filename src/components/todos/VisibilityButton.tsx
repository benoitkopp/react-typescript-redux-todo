import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  setVisibilityFilter,
  VisibilityFilter,
} from '../../features/todos/todosSlice'

interface Props {
  visibilityFilter: VisibilityFilter
  children: React.ReactNode
}

const VisibilityButton = ({
  visibilityFilter,
  children,
}: Props): JSX.Element => {
  const currentVisibilityFilter = useAppSelector(
    state => state.todos.visibilityFilter,
  )
  const dispatch = useAppDispatch()

  const isCurrentFilter = (visibilityFilter: VisibilityFilter): boolean => {
    return visibilityFilter === currentVisibilityFilter
  }

  return (
    <button
      className={`flex-1 px-5 py-2 rounded border transition ${
        isCurrentFilter(visibilityFilter) ? 'bg-blue-600 text-white' : ''
      }`}
      onClick={() => dispatch(setVisibilityFilter(visibilityFilter))}
    >
      {children}
    </button>
  )
}

export default VisibilityButton
