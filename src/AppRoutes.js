import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ProjectRoadmap from './project-roadmap'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
  {
    path: '/v1',
    element: <ProjectRoadmap />,
  },
  {
    path: '*',
    element: (
      <h2 className=" block text-3xl font-bold text-center text-cyan-700">
        404 Notfound
      </h2>
    ),
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}
