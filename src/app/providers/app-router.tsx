import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import PrivateRoute from "../guards/private-route";
import { RootLayout } from "@/widgets/root-layout/ui/root-layout";
import { ROUTES } from "@/shared/constants/routes";
import { LoginPage, SigninPage } from "@/pages/auth";
import { ExplorerPage } from "@/pages/explorer";
import { LinkResolverPage } from "@/pages/share-link";

const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <SigninPage />,
  },
  {
    path: '/link-resolver/:id', 
    element: <LinkResolverPage />,
  },
  {
    path: ROUTES.ROOT,
    element: (
        <PrivateRoute>
          <RootLayout />
        </PrivateRoute>
    ),
    
    children: [
      {
        path: '',
        loader: () => redirect(ROUTES.EXPLORER),
      },
      {
        path: ROUTES.EXPLORER,
        element: <ExplorerPage />,
      },
    ]
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />;
}