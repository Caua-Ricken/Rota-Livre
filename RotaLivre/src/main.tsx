import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import ExplorePage from './pages/explore-page/ExplorePage.tsx'
import NotFoundPage from './pages/not-found-page/NotFoundPage.tsx'
import Destinations from './pages/destinations/Destinations.tsx';

const router = createHashRouter([
  {
    path: '/',
    element: <ExplorePage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/destinos',
    element: <Destinations />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


