import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { publicRoutes } from "./PublicRoutes";
import { routesGenerator } from "@/utils/Generator/RoutesGenerator";

import App from "../App";
const Login = lazy(() => import("@/pages/Auth/Login"));
const Signup = lazy(() => import("@/pages/Auth/Signup"));
const Form = lazy(() => import("@/pages/Form"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      ...routesGenerator(publicRoutes),
      {
        path: "/form",
        element: <Form />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
