import React from 'react'
import { Route, Routes } from 'react-router'
import UseState from './apps/UseState'

const routes = [
  { path: '/', element: <UseState /> },
  { path: '/use-state', element: <UseState /> },
]

const App: React.FC = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  )
}

export default App
