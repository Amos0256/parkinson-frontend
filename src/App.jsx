import logo from "./logo.svg";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor/List";
import Patient from "./pages/Patient/List";
import Upload from "./pages/Patient/Upload";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

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
