import { useState } from 'react'
import { TodoProps } from '../../App.types'
import '../../index.css'

const Todo = ({
  id,
  content,
  completed,
  onComplete,
  onEdit,
  onDelete
}: TodoProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(content)
  const inputValueChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value)
  }

  const startEditing = () => {
    setIsEditing(true)
  }

  const finishEditing = () => {
    setIsEditing(false)
    onEdit(id, inputValue)
  }

  const contentClass: string = `${
    completed ? 'content line-through' : 'content'
  }`

  return (
    <div className="todo-container">
      {isEditing ? (
        <>
          <input
            type="text"
            className="content"
            onChange={inputValueChangeHandler}
            value={inputValue}
            autoFocus
          />
          <button className="button submit" onClick={finishEditing}>
            Submit
          </button>
        </>
      ) : (
        <>
          <p className={contentClass} onClick={() => startEditing()}>
            {content}
          </p>
          <div className="controls">
            {!completed && (
              <button
                className="button complete"
                onClick={() => onComplete(id)}
              >
                Complete
              </button>
            )}
            <button className="button edit" onClick={() => startEditing()}>
              Edit
            </button>
            <button className="button delete" onClick={() => onDelete(id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Todo
