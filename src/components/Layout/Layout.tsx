import { LayoutProps } from '../../App.types'
import todoIcon from '../assets/todo.svg'

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header className="header">
        <img className="todo-icon" src={todoIcon} />
        <h1>My Tasks</h1>
      </header>
      <main className="main">{children}</main>
      <footer>
        Made by{' '}
        <a href="https://github.com/adiletbaimyrza" target="_blank">
          Adilet Baimyrza
        </a>
      </footer>
    </>
  )
}

export default Layout
