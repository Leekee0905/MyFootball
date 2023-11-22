import { createBrowserRouter } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';
import Home from './pages/Home/Home';
import Layout from './layouts/Layout';
import Login from './pages/Login/Login';

interface RouterElement {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
  withAuth?: boolean;
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: '/',
    label: 'Home',
    element: <Home />,
    withAuth: false,
  },
  {
    id: 1,
    path: '/login',
    label: 'Login',
    element: <Login />,
    withAuth: false,
  },
];

export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router) => {
    return {
      path: router.path,
      element: <Layout>{router.element}</Layout>,
    };
  }),
);
