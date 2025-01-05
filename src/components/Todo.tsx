import { SquareCheck, SquarePen, SquarePlus, Trash2, Undo2 } from 'lucide-react'
import { useState } from 'react'
import { TodoProps } from '../types'
import Button from './ui/Button'
import Card from './ui/Card'
import Textarea from './ui/Textarea'

const Todo = ({
  id,
  content,
  completed,
  onComplete,
  onEdit,
  onDelete,
  onUndo,
}: TodoProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(content)

  const startEditing = () => {
    setIsEditing(true)
  }

  const finishEditing = () => {
    setIsEditing(false)
    onEdit(id, inputValue)
  }

  const baseClass =
    'grow min-h-[72px] max-w-[410px] text-pretty break-words mr-4 w-full bg-white dark:bg-darkBg rounded-base border-2 border-border dark:border-darkBorder p-[10px] font-base ring-offset-white dark:ring-offset-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border dark:focus-visible:ring-darkBorder focus-visible:ring-offset-2 outline-none'
  const completedClass = 'line-through'
  const contentClass = `${baseClass} ${completed ? completedClass : ''}`

  return (
    <Card className="flex mb-4">
      {isEditing ? (
        <>
          <Textarea
            setValue={setInputValue}
            value={inputValue}
            placeholder=""
            className="min-h-12 mr-4"
          />
          <div className="flex items-center">
            <Button
              className="bg-[#7dff7d] hover:bg-[#31ac31]"
              onClick={finishEditing}
            >
              <SquarePlus />
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className={contentClass} onClick={() => startEditing()}>
            {content}
          </p>
          <div className="flex items-center">
            {!completed ? (
              <Button
                className="mr-2 bg-[#7dff7d] hover:bg-[#31ac31]"
                onClick={() => onComplete(id)}
              >
                <SquareCheck />
              </Button>
            ) : (
              <Button
                className="mr-2 bg-[#7dff7d] hover:bg-[#31ac31]"
                onClick={() => onUndo(id)}
              >
                <Undo2 />
              </Button>
            )}
            <Button
              className="mr-2 bg-[#ffff73] hover:bg-[#a9a92e]"
              onClick={() => startEditing()}
            >
              <SquarePen />
            </Button>
            <Button
              className="mr-2 bg-[#ff7d7d] hover:bg-[#ae3333]"
              onClick={() => onDelete(id)}
            >
              <Trash2 />
            </Button>
          </div>
        </>
      )}
    </Card>
  )
}

export default Todo
