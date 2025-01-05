import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { TodoType } from '../../shared/types'

export interface TodoListState {
  value: TodoType[]
}

const initialState: TodoListState = {
  value: [],
}

export const TodoListSlice = createSlice({
  name: 'TodoListSlice',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<TodoType[]>) => {
      state.value = action.payload
    },
  },
})

export const { set } = TodoListSlice.actions
export default TodoListSlice.reducer
