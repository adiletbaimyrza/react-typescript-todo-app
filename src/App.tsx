import React from 'react'
import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router'
import Redux from './apps/Redux'
import { store } from './apps/Redux/store'
import UseState from './apps/UseState'

const routes = [
  { path: '/', element: <UseState /> },
  { path: '/use-state', element: <UseState /> },
  {
    path: '/redux',
    element: (
      <Provider store={store}>
        <Redux />
      </Provider>
    ),
  },
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
