import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TodoType } from '../../shared/types'
import AddTodo from './AddTodo'
import Layout from './Layout'
import { RootState } from './store'
import Todo from './Todo'
import { set } from './TodoListSlice'

function UseState() {
  const todoList = useSelector((state: RootState) => state.todoList.value)
  const dispatch = useDispatch()

  useEffect(() => {
    const data = localStorage.getItem('todoList')
    if (data) {
      dispatch(set(JSON.parse(data)))
    }
  }, [dispatch])

  const completeHandler = (id: string) => {
    const newTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo
    )
    dispatch(set(newTodoList))

    localStorage.setItem('todoList', JSON.stringify(newTodoList))
  }

  const editHandler = (id: string, content: string) => {
    if (content.length === 0) {
      deleteHandler(id)
    } else {
      const newTodoList = todoList.map((todo) =>
        todo.id === id ? { ...todo, content: content } : todo
      )
      dispatch(set(newTodoList))

      localStorage.setItem('todoList', JSON.stringify(newTodoList))
    }
  }

  const deleteHandler = (id: string) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id)
    dispatch(set(newTodoList))

    localStorage.setItem('todoList', JSON.stringify(newTodoList))
  }

  const addHandler = ({ id, content, completed }: TodoType) => {
    const newTodoList = [...todoList, { id, content, completed }]
    dispatch(set(newTodoList))

    localStorage.setItem('todoList', JSON.stringify(newTodoList))
  }

  const undoHandler = (id: string) => {
    const newTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    dispatch(set(newTodoList))
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
