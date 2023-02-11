import { observer } from 'mobx-react-lite';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { AppLayout, GuestLayout } from '../layout';
import { Home, Login, Room } from '../pages';
import { appPaths, guestPaths } from './paths';

const guestRouter = createBrowserRouter([
  {
    element: <GuestLayout />,
    children: [
      {
        path: guestPaths.LOGIN,
        element: <Login />,
      },
      {
        path: '*',
        element: <Navigate to={guestPaths.LOGIN} />,
      },
    ],
  },
]);

const appRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: appPaths.INDEX,
        element: <Home />,
      },
      {
        path: appPaths.ROOM,
        element: <Room />,
      },
      {
        path: '*',
        element: <Navigate to={appPaths.INDEX} />,
      },
    ],
  },
]);

function Router() {
  const { isLoggedIn } = useAuth();
  return <RouterProvider router={isLoggedIn ? appRouter : guestRouter} />;
}

export default observer(Router);
