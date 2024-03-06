import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Layout } from '..'

describe('Layout', () => {
  it('renders itself and children correctly', () => {
    const { getByText } = render(
      <Layout>
        <h1>Mock child</h1>
      </Layout>
    )

    expect(getByText('Mock child')).toBeInTheDocument()
  })

  it('renders the header with the correct text', () => {
    const { getByText } = render(
      <Layout>
        <h1>Mock child</h1>
      </Layout>
    )
    expect(getByText('My Tasks')).toBeInTheDocument()
  })

  it('renders the footer with the correct text', () => {
    const { getByText } = render(
      <Layout>
        <h1>Mock child</h1>
      </Layout>
    )
    expect(getByText('Made by')).toBeInTheDocument()
    expect(getByText('Adilet Baimyrza')).toBeInTheDocument()
  })
})
