import { createBrowserRouter } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';
import Home from './pages/home/Home';
import Layout from './layouts/Layout';
import Login from './pages/login/Login';
import FreeBoard from './pages/freeboard/FreeBoard';
import Schedule from './pages/schedule/Schedule';
import Table from './pages/table/Table';
import Signup from './pages/signup/Signup';

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
  {
    id: 2,
    path: '/freeBoard',
    label: 'FreeBoard',
    element: <FreeBoard />,
    withAuth: false,
  },
  {
    id: 3,
    path: '/schedule',
    label: 'Schedule',
    element: <Schedule />,
    withAuth: false,
  },
  {
    id: 4,
    path: '/table',
    label: 'Table',
    element: <Table />,
    withAuth: false,
  },
  {
    id: 5,
    path: '/signup',
    label: 'Signup',
    element: <Signup />,
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
