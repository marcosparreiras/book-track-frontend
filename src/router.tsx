import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignIn } from "./pages/auth/sign-in";
import { AuthLayout } from "./pages/_layouts/auth-layout";
import { SignUp } from "./pages/auth/sign-up";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
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
