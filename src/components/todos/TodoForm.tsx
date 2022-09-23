import { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { add, VisibilityFilter } from '../../features/todos/todosSlice'

import VisibilityButton from './VisibilityButton'

const TodoForm = (): JSX.Element => {
  const [description, setDescription] = useState<string>('')
  const dispatch = useAppDispatch()

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    if (description.length === 0) return

    dispatch(add(description))

    setDescription('')
  }

  return (
    <form data-testid="task-form" onSubmit={onSubmit} className="mb-2">
      <div className="flex items-center mb-2">
        <input
          className="w-full rounded border border-gray-400 px-3 py-2 h-10 focus:outline-none focus:border-primary focus:shadow-lg"
          placeholder="Enter a task to do"
          value={description}
          onChange={e => setDescription(e.target.value)}
          data-testid="task-input"
        />
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded ml-2"
          type="submit"
        >
          Add
        </button>
      </div>
      <div className="flex space-x-2">
        <VisibilityButton visibilityFilter={VisibilityFilter.all}>
          All
        </VisibilityButton>
        <VisibilityButton visibilityFilter={VisibilityFilter.active}>
          Active
        </VisibilityButton>
        <VisibilityButton visibilityFilter={VisibilityFilter.completed}>
          Completed
        </VisibilityButton>
      </div>
    </form>
  )
}

export default TodoForm
