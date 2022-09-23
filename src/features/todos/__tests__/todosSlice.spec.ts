import reducer, {
  TodosState,
  add,
  remove,
  toggleCompleted,
  setVisibilityFilter,
  VisibilityFilter,
} from '../todosSlice'
import * as uuid from 'uuid'
jest.mock('uuid')

describe('Todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      todos: [],
      visibilityFilter: VisibilityFilter.all,
    })
  })

  it('should add a task to the todos', () => {
    jest.spyOn(uuid, 'v4').mockReturnValue('task-1')

    expect(reducer(undefined, add('New task'))).toEqual({
      todos: [{ id: 'task-1', description: 'New task', completed: false }],
      visibilityFilter: VisibilityFilter.all,
    })
  })

  it('should remove a task from the todos', () => {
    const initialState: TodosState = {
      todos: [
        { id: 'task-1', description: 'TASK 1', completed: true },
        { id: 'task-2', description: 'TASK 2', completed: false },
      ],
      visibilityFilter: VisibilityFilter.all,
    }

    expect(reducer(initialState, remove('task-2'))).toEqual({
      todos: [{ id: 'task-1', description: 'TASK 1', completed: true }],
      visibilityFilter: VisibilityFilter.all,
    })
  })

  describe('toggle the task', () => {
    const initialState: TodosState = {
      todos: [
        { id: 'task-1', description: 'TASK 1', completed: false },
        { id: 'task-2', description: 'TASK 2', completed: true },
      ],
      visibilityFilter: VisibilityFilter.all,
    }

    it('should be completed (task 1)', () => {
      expect(reducer(initialState, toggleCompleted('task-1'))).toEqual({
        todos: [
          { id: 'task-1', description: 'TASK 1', completed: true },
          { id: 'task-2', description: 'TASK 2', completed: true },
        ],
        visibilityFilter: VisibilityFilter.all,
      })
    })

    it('should be active (task 2)', () => {
      expect(reducer(initialState, toggleCompleted('task-2'))).toEqual({
        todos: [
          { id: 'task-1', description: 'TASK 1', completed: false },
          { id: 'task-2', description: 'TASK 2', completed: false },
        ],
        visibilityFilter: VisibilityFilter.all,
      })
    })
  })

  it('should set the visibility filter', () => {
    expect(
      reducer(undefined, setVisibilityFilter(VisibilityFilter.completed)),
    ).toEqual({
      todos: [],
      visibilityFilter: VisibilityFilter.completed,
    })
  })
})
