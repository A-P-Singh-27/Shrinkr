import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import LinkPage from './pages/LinkPage'
import RedirectLink from './pages/RedirectLink'
import Home from './pages/Home'
import {UrlProvider} from './Context/Context'
import Require_Auth from './components/Require_Auth'

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/dashboard',
        element:<Require_Auth><Dashboard/></Require_Auth>
      },
      {
        path:'/auth',
        element:<Auth/>
      },
      {
        path:'/link/:id',
        element:<LinkPage/>
      },
      {
        path:'/:id',
        element:<RedirectLink/>
      },
    ] // in this array we tyoe the routes of the no. of pages in the app
  },
])


createRoot(document.getElementById('root')).render(
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
)
