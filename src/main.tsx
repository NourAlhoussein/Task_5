import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditItem from "./components/EditItem/EditItem";
import Items from "./components/Items/Items";
import AddNewItem from "./components/AddNewItem/AddNewItem";
import ItemIndex from "./components/ShowIndex/ItemIndex";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";

const routers = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Items />,
      },
      {
        path: "edit/:id",
        element: <EditItem />,
      },
      {
        path: "add",
        element: <AddNewItem />,
      },
      {
        path: "Info/:id",
        element: <ItemIndex />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routers} />
  </StrictMode>
);
