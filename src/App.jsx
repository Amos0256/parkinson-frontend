import Home from "./pages/Home";
import Doctor from "./pages/Doctor/List";
import Patient from "./pages/Patient/List";
import Upload from "pages/Patient/Upload";
import Login from "pages/Login";
import EachPatient from "pages/Doctor/EachPatient";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/doctor",
    element: <Doctor />,
  },
  {
    path: "/doctor/each",
    element: <EachPatient />,
  },
  {
    path: "/patient",
    element: <Patient />,
  },
  {
    path: "/patient/upload",
    element: <Upload />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
