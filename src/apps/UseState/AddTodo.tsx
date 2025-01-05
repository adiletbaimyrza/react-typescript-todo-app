import { Plus } from 'lucide-react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { AddTodoProps } from '../../shared/types'
import Button from '../../shared/ui/Button'
import Card from '../../shared/ui/Card'
import Textarea from '../../shared/ui/Textarea'

const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [inputValue, setInputValue] = useState('')

  const addHandler = () => {
    if (inputValue.trim() !== '') {
      onAdd({ id: uuidv4(), content: inputValue, completed: false })
      setInputValue('')
    }
  }

  return (
    <Card className="flex flex-col items-end">
      <Textarea
        className="mb-4"
        value={inputValue}
        placeholder={'Ex: Buy groceries 🧺'}
        setValue={setInputValue}
      />
      <Button onClick={addHandler}>
        <Plus />
      </Button>
    </Card>
  )
}

export default AddTodo
