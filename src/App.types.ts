export type TodoType = {
  id: string
  content: string
  completed: boolean
}

export type TodoProps = {
  id: string
  content: string
  completed: boolean
  onComplete: (id: string) => void
  onEdit: (id: string, content: string) => void
  onDelete: (id: string) => void
}

export type LayoutProps = {
  children: React.ReactNode
}

export type AddTodoProps = {
  onAdd: ({ id, content, completed }: TodoType) => void
}
