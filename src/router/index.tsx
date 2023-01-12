import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, Login, Room } from '../pages';
import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { appPaths, guestPaths } from './paths';
import Layout from '../layout';

type PageComponentMap = {
  [path: string]: ReactNode;
};

const guestPages: PageComponentMap = {
  [guestPaths.LOGIN]: <Login />,
  '*': <Navigate to={guestPaths.LOGIN} />,
};

const appPages: PageComponentMap = {
  [appPaths.INDEX]: <Home />,
  [appPaths.ROOM]: <Room />,
  '*': <Navigate to={appPaths.INDEX} />,
};

const createRouter = (pages: PageComponentMap) =>
  createBrowserRouter([
    {
      element: <Layout />,
      children: Object.keys(pages).map((key) => ({
        path: key,
        element: pages[key],
      })),
    },
  ]);

const guestRouter = createRouter(guestPages);
const appRouter = createRouter(appPages);

export default function Router() {
  const { isLoggedIn } = useAuth();
  return <RouterProvider router={isLoggedIn ? appRouter : guestRouter} />;
}
