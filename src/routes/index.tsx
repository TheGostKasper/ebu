import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

const Dashboard = lazy(() => import("../pages/telecom-dashboard"));
const Home = lazy(() => import("../pages/Home"));
const Users = lazy(() => import("../pages/Users"));
const Settings = lazy(() => import("../pages/Settings"));
// const LoginPage = lazy(() => import("../pages/LoginPage"));
// const UsersPage = lazy(() => import("../pages/UsersPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "home",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
  // {
  //   path: "/login",
  //   element: <LoginPage />, // No need for protection on the login page
  // },
]);

export default router;
