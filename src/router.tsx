import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignIn } from "./pages/auth/sign-in";
import { AuthLayout } from "./pages/_layouts/auth-layout";
import { SignUp } from "./pages/auth/sign-up";
import { Home } from "./pages/app/home";
import { AppLayout } from "./pages/_layouts/app-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
