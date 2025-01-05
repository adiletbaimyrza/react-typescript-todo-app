import { useEffect, useState } from 'react'
import { TodoType } from '../../shared/types'
import AddTodo from './AddTodo'
import Layout from './Layout'
import Todo from './Todo'

function UseState() {
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
    if (content.length === 0) {
      deleteHandler(id)
    } else {
      const newTodoList = todoList.map((todo) =>
        todo.id === id ? { ...todo, content: content } : todo
      )
      setTodoList(newTodoList)

      localStorage.setItem('todoList', JSON.stringify(newTodoList))
    }
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

  const undoHandler = (id: string) => {
    const newTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodoList(newTodoList)
    localStorage.setItem('todoList', JSON.stringify(newTodoList))
  }

  return (
    <Layout>
      <AddTodo onAdd={addHandler} />
      {todoList.filter((todo) => todo.completed === false).length !== 0 && (
        <>
          <h3 className="text-center my-4 text-xl font-bold">TO DO</h3>
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
                onUndo={undoHandler}
              />
            ))}
        </>
      )}
      {todoList.filter((todo) => todo.completed === true).length !== 0 && (
        <>
          <h3 className="text-center my-4 text-xl font-bold">COMPLETED</h3>
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
                onUndo={undoHandler}
              />
            ))}
        </>
      )}
      {todoList.length === 0 && (
        <h2 className="text-center my-4 text-xl font-bold">
          You have no tasks for today...
        </h2>
      )}
    </Layout>
  )
}

export default UseState
