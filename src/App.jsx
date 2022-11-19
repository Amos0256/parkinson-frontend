
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthHost from 'components/AuthHost'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/doctor',
    element: <Doctor />,
  },
  {
    path: '/doctor/each',
    element: <EachPatient />,
  },
  {
    path: '/patient',
    element: <Patient />,
  },
  {
    path: '/patient/upload',
    element: <Upload />,
  },
])

function App() {
  return (
    <AuthHost>
      <RouterProvider router={router} />
    </AuthHost>
  )
}

export default App
