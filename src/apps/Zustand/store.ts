import { create } from 'zustand'
import { TodoType } from '../../shared/types'

interface TodoListState {
  todoList: TodoType[]
  setTodoList: (todoList: TodoType[]) => void
}

export const useStore = create<TodoListState>((set) => ({
  todoList: [],
  setTodoList: (todoList) => set({ todoList }),
}))
