import { useState } from 'react'
import { AddTodoProps } from '../../App.types'
import { v4 as uuidv4 } from 'uuid'

const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [inputValue, setInputValue] = useState('')

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const addHandler = () => {
    if (inputValue.trim() !== '') {
      onAdd({ id: uuidv4(), content: inputValue, completed: false })
      setInputValue('')
    }
  }

  return (
    <div className="add-todo">
      <input
        className="input-add-todo"
        type="text"
        value={inputValue}
        placeholder="Type here..."
        onChange={inputChangeHandler}
      />
      <button className="input-add-button add" onClick={addHandler}>
        Add
      </button>
    </div>
  )
}

export default AddTodo
