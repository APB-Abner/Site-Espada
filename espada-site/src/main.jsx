import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
// import App from './components/test.jsx'
import App from './App.jsx'
// import App from './components/Portal.jsx'
import Story from './components/Book.jsx'
import Scene from './components/Scene.jsx'
import Legandary from './components/legendadary.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Scene /> },
      { path: '/story', element: <Story /> },
      // { path: '*', element: <PageNotFound /> },
      // { path: ':name', element: <ContentPage /> }
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

