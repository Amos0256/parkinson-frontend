
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import AuthHost from 'components/AuthHost'
import Home from "pages/Home";
import Doctor from "pages/Doctor/List";
import Patient from "pages/Patient/List";
import Upload from "pages/Patient/Upload";
import Login from "pages/Login";
import EachPatient from "pages/Doctor/EachPatient";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />,
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
    path: '/doctor/each/:id',
    element: <EachPatient />,
  },
  {
    path: '/patient',
    element: <Patient />,
  },
  {
    path: '/patient/upload',
    element: <Upload />,
  }
])

function App() {
  return (
    <AuthHost>
      <></>
      <RouterProvider router={router} />
    </AuthHost>
  )
}

export default App
