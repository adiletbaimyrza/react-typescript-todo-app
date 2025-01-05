import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import todoIcon from '../../assets/todo.svg'
import { LayoutProps } from '../../shared/types'
import Button from '../../shared/ui/Button'
import Card from '../../shared/ui/Card'

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark')
      setIsDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setIsDarkMode(false)
    }
  }, [])

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
    setIsDarkMode(!isDarkMode)
  }

  return (
    <Button className="absolute right-4" onClick={toggleTheme}>
      {isDarkMode ? <Sun /> : <Moon />}
    </Button>
  )
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Card className="flex justify-center items-center my-4 relative">
        <img className="h-9 w-9 mr-4" src={todoIcon} />
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <ThemeSwitcher />
      </Card>

      <main className="grow">{children}</main>

      <footer className="text-center my-4">
        Made by{' '}
        <a
          className="text-violet-700 underline"
          href="https://github.com/adiletbaimyrza"
          target="_blank"
        >
          Adilet Baimyrza
        </a>
      </footer>
    </>
  )
}

export default Layout
