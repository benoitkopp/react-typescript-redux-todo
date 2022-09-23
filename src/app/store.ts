import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'

import todosSlice from '../features/todos/todosSlice'

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  todos: todosSlice,
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
