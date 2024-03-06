import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { v4 as uuidv4 } from 'uuid'
import { Todo } from '..'

describe('Todo', () => {
  let mockComplete: (id: string) => void,
    mockEdit: (id: string, content: string) => void,
    mockDelete: (id: string) => void,
    mockId: string,
    mockContent: string,
    mockCompleted: boolean

  beforeEach(() => {
    mockComplete = jest.fn()
    mockEdit = jest.fn()
    mockDelete = jest.fn()
    mockId = uuidv4()
    mockContent = 'Mock todo'
    mockCompleted = false
  })

  it('renders with correct content, status and buttons', () => {
    const { getByText } = render(
      <Todo
        id={mockId}
        content={mockContent}
        completed={mockCompleted}
        onComplete={mockComplete}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    )

    expect(getByText('Mock todo')).toBeInTheDocument()
    expect(getByText('Complete')).toBeInTheDocument()
    expect(getByText('Edit')).toBeInTheDocument()
    expect(getByText('Delete')).toBeInTheDocument()
  })

  it('calls the onComplete function when the Complete button is clicked', () => {
    const { getByText } = render(
      <Todo
        id={mockId}
        content={mockContent}
        completed={mockCompleted}
        onComplete={mockComplete}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    )

    fireEvent.click(getByText('Complete'))

    expect(mockComplete).toHaveBeenCalledWith(mockId)
  })

  it('calls the onDelete function when the Delete button is clicked', () => {
    const { getByText } = render(
      <Todo
        id={mockId}
        content={mockContent}
        completed={mockCompleted}
        onComplete={mockComplete}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    )

    fireEvent.click(getByText('Delete'))

    expect(mockDelete).toHaveBeenCalledWith(mockId)
  })

  it('enters edit mode when the Edit button is clicked', () => {
    const { getByText, getByDisplayValue } = render(
      <Todo
        id={mockId}
        content={mockContent}
        completed={mockCompleted}
        onComplete={mockComplete}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    )

    fireEvent.click(getByText('Edit'))

    expect(getByDisplayValue('Mock todo')).toBeInTheDocument()
    expect(getByText('Submit')).toBeInTheDocument()
  })

  it('enters edit mode when the input field is clicked', () => {
    const { getByText, getByDisplayValue } = render(
      <Todo
        id={mockId}
        content={mockContent}
        completed={mockCompleted}
        onComplete={mockComplete}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    )

    fireEvent.click(getByText('Mock todo'))

    expect(getByDisplayValue('Mock todo')).toBeInTheDocument()
    expect(getByText('Submit')).toBeInTheDocument()
  })

  it('calls the onEdit function with the new content when the Submit button is clicked', () => {
    const { getByText, getByDisplayValue } = render(
      <Todo
        id={mockId}
        content={mockContent}
        completed={mockCompleted}
        onComplete={mockComplete}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    )

    fireEvent.click(getByText('Edit'))
    fireEvent.change(getByDisplayValue('Mock todo'), {
      target: { value: 'New content' }
    })
    fireEvent.click(getByText('Submit'))

    expect(mockEdit).toHaveBeenCalledWith(mockId, 'New content')
  })

  it('does not display Complete button when Todo is completed', () => {
    const { queryByText } = render(
      <Todo
        id={mockId}
        content={mockContent}
        completed={true}
        onComplete={mockComplete}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    )

    expect(queryByText('Complete')).not.toBeInTheDocument()
  })
})
