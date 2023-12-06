import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Root from './routes/root'
import Login from './routes/login'
import Register from './routes/register'
import Reservacion from './routes/reservacion'
import Reservaciones from './routes/reservaciones'
import Rastrear from './routes/rastrear'
import NewPago from './routes/new_pago'
import Home from './routes/home'
import SeePago from './routes/see_pago'
import Mapeo from './routes/mapeo'
import VuelosDisponibles from "./routes/vuelos_disponibles"
import './index.css'
import ReservacionCreada from './routes/reservacion_creada'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/reservacion",
    element: <Reservacion />
  },{
    path: "/rastrear",
    element: <Rastrear />
  },
  {
    path: "/new_pago",
    element: <NewPago />
  },
  {
    path: "/see_pago",
    element: <SeePago />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/vuelos_disponibles",
    element: <VuelosDisponibles />
  },
  {
    path: "/reservaciones",
    element: <Reservaciones />
  },
  {
    path: "/reservacion_creada",
    element: <ReservacionCreada />
  },
  {
    path: "/mapeo",
    element: <Mapeo />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
