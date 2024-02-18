import { AddTodo, Todo, Layout } from './components'
import { useEffect, useState } from 'react'
import { TodoType } from './App.types'

function App() {
  const [todoList, setTodoList] = useState<TodoType[]>([])

  useEffect(() => {
    const data = localStorage.getItem('todoList')
    if (data) {
      setTodoList(JSON.parse(data))
    }
  }, [])

  const completeHandler = (id: string) => {
    const newTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo
    )
    setTodoList(newTodoList)

    localStorage.setItem('todoList', JSON.stringify(newTodoList))
  }

  const editHandler = (id: string, content: string) => {
    const newTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, content: content } : todo
    )
    setTodoList(newTodoList)

    localStorage.setItem('todoList', JSON.stringify(newTodoList))
  }

  const deleteHandler = (id: string) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id)
    setTodoList(newTodoList)

    localStorage.setItem('todoList', JSON.stringify(newTodoList))
  }

  const addHandler = ({ id, content, completed }: TodoType) => {
    const newTodoList = [...todoList, { id, content, completed }]
    setTodoList(newTodoList)

    localStorage.setItem('todoList', JSON.stringify(newTodoList))
  }

  return (
    <Layout>
      <AddTodo onAdd={addHandler} />
      {todoList.filter((todo) => todo.completed === false).length !== 0 && (
        <>
          <h3>TO DO</h3>
          {todoList
            .reverse()
            .filter((todo) => todo.completed === false)
            .map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                content={todo.content}
                completed={todo.completed}
                onComplete={completeHandler}
                onEdit={editHandler}
                onDelete={deleteHandler}
              />
            ))}
        </>
      )}
      {todoList.filter((todo) => todo.completed === true).length !== 0 && (
        <>
          <h3>COMPLETED</h3>
          {todoList
            .reverse()
            .filter((todo) => todo.completed === true)
            .map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                content={todo.content}
                completed={todo.completed}
                onComplete={completeHandler}
                onEdit={editHandler}
                onDelete={deleteHandler}
              />
            ))}
        </>
      )}
      {todoList.length === 0 && (
        <h2 className="no-task-placeholder">You have no tasks for today...</h2>
      )}
    </Layout>
  )
}

export default App
