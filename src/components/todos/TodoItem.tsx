import { useRef } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { remove, toggleCompleted } from '../../features/todos/todosSlice'
import { Todo } from '../../models/Todo'
import { FontAwesomeIcon } from '../../fontawesome'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import './TodoItem.css'

interface Props {
  todo: Todo
}

const TodoItem = ({ todo }: Props): JSX.Element => {
  const completeRef = useRef<HTMLDivElement | null>(null)
  const activeRef = useRef<HTMLDivElement | null>(null)
  const nodeRef = todo.completed ? completeRef : activeRef
  const dispatch = useAppDispatch()

  const onRemove = (): void => {
    dispatch(remove(todo.id))
  }

  const onToggleCompleted = (): void => {
    dispatch(toggleCompleted(todo.id))
  }

  return (
    <div
      className="border rounded p-3 flex justify-between items-center cursor-pointer transition"
      onClick={onToggleCompleted}
      data-testid="todo-item"
    >
      <div className="flex items-center space-x-2">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={todo.completed ? 'completed' : 'active'}
            nodeRef={nodeRef}
            addEndListener={(done: () => void) => {
              nodeRef.current?.addEventListener('transitionend', done, false)
            }}
            classNames="fade"
          >
            <div ref={nodeRef}>
              <FontAwesomeIcon
                icon={todo.completed ? 'circle-check' : 'circle'}
                className={todo.completed ? 'text-green-400' : 'text-gray-300'}
                size="lg"
                fixedWidth
              />
            </div>
          </CSSTransition>
        </SwitchTransition>

        <div
          className={`text-xl transition ${
            todo.completed ? 'text-gray-400 line-through' : ''
          }`}
        >
          {todo.description}
        </div>
      </div>

      <FontAwesomeIcon
        icon="trash-alt"
        onClick={onRemove}
        color="red"
        fixedWidth
        data-testid="remove-todo-item"
      />
    </div>
  )
}

export default TodoItem
