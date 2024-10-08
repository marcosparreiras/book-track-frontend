import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignIn } from "./pages/auth/sign-in";
import { AuthLayout } from "./pages/_layouts/auth-layout";
import { SignUp } from "./pages/auth/sign-up";
import { Home } from "./pages/app/home";
import { AppLayout } from "./pages/_layouts/app-layout";
import { BookCreate } from "./pages/app/book-create";
import { BookEdit } from "./pages/app/book-edit";
import { BookDetails } from "./pages/app/book-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/book/create",
        element: <BookCreate />,
      },
      {
        path: "/book/:bookId/edit",
        element: <BookEdit />,
      },
      {
        path: "/book/:bookId",
        element: <BookDetails />,
      },
      {
        path: "*",
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
