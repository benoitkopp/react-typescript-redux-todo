import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo } from '../../models/Todo'
import { v4 as uuidv4 } from 'uuid'

export enum VisibilityFilter {
  all = 'ALL',
  active = 'ACTIVE',
  completed = 'COMPLETED',
}

export interface TodosState {
  todos: Todo[]
  visibilityFilter: VisibilityFilter
}

const initialState: TodosState = {
  todos: [],
  visibilityFilter: VisibilityFilter.all,
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload)
      },
      prepare: (description: string) => ({
        payload: {
          id: uuidv4(),
          description,
          completed: false,
        },
      }),
    },
    remove(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
    toggleCompleted(state, action: PayloadAction<string>) {
      const todo = state.todos.find(todo => todo.id === action.payload)
      if (todo != null) todo.completed = !todo.completed
    },
    setVisibilityFilter(state, action: PayloadAction<VisibilityFilter>) {
      state.visibilityFilter = action.payload
    },
  },
})

export const { add, remove, toggleCompleted, setVisibilityFilter } =
  todosSlice.actions

export default todosSlice.reducer
