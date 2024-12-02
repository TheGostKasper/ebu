import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute"; // adjust the import path
import Unauthorized from "../Auth/Unauthorized";
import Login from "../Auth/Login";
import FiberDashboard from "../components/Features/Fiber";

const Dashboard = lazy(() => import("../pages/telecom-dashboard"));
const Home = lazy(() => import("../pages/Mobility"));
const Users = lazy(() => import("../pages/Users"));
const Settings = lazy(() => import("../pages/Settings"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/unauthorized",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Unauthorized />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
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
            path: "fiber",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <FiberDashboard />
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
        ],
      },
    ],
  },
]);

export default router;
