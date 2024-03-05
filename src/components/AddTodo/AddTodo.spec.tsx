import { render, fireEvent } from '@testing-library/react'
import { AddTodo } from '..'

describe('AddTodo', () => {
  it('renders without crashing', () => {
    const mockAdd = jest.fn()
    render(<AddTodo onAdd={mockAdd} />)
  })

  it('updates the input field when the user types into it', () => {
    const mockAdd = jest.fn()
    const { getByPlaceholderText } = render(<AddTodo onAdd={mockAdd} />)

    const input = getByPlaceholderText('Type here...') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Test todo' } })

    expect(input.value).toBe('Test todo')
  })

  it('calls the onAdd function when the Add button is clicked', () => {
    const mockAdd = jest.fn()
    const { getByPlaceholderText, getByText } = render(
      <AddTodo onAdd={mockAdd} />
    )

    fireEvent.change(getByPlaceholderText('Type here...'), {
      target: { value: 'Test todo' }
    })
    fireEvent.click(getByText('Add'))

    expect(mockAdd).toHaveBeenCalledWith({
      id: expect.any(String),
      content: 'Test todo',
      completed: false
    })
  })

  it('does not call the onAdd function when the input is empty', () => {
    const mockAdd = jest.fn()
    const { getByText } = render(<AddTodo onAdd={mockAdd} />)

    fireEvent.click(getByText('Add'))

    expect(mockAdd).not.toHaveBeenCalled()
  })

  it('clears the input field after a todo is added', () => {
    const mockAdd = jest.fn()
    const { getByPlaceholderText, getByText } = render(
      <AddTodo onAdd={mockAdd} />
    )

    const input = getByPlaceholderText('Type here...') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Test todo' } })
    fireEvent.click(getByText('Add'))

    expect(input.value).toBe('')
  })
})
