import logo from "./logo.svg";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor/List";
import Patient from "pages/Patient/List";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Upload from "pages/Patient/Upload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },{
    path: "/login",
    element: <Home />,
  },
  {
    path: "/doctor",
    element: <Doctor/>,
  },
  {
    path: "/patient",
    element: <Patient/>,
  },
  {
    path: "/patient/upload",
    element: <Upload/>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
