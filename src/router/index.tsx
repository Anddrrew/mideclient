import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { appPaths, guestPaths } from './paths';
import { Home, Login, Room } from '../pages';
import { useAuth } from '../contexts/AuthContext';
import GuestLayout from '../layout/GuestLayout';
import AppLayout from '../layout/AppLayout';
import { observer } from 'mobx-react-lite';

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
