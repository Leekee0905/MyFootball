import { createBrowserRouter } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';
import Home from './pages/home/Home';
import Layout from './layouts/Layout';
import Schedule from './pages/schedule/Schedule';
import Table from './pages/table/Table';
import Error404 from './pages/error/Error404';
interface RouterElement {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: '/',
    label: 'Home',
    element: <Home />,
  },
  {
    id: 1,
    path: '/schedule',
    label: 'Schedule',
    element: <Schedule />,
  },
  {
    id: 2,
    path: '/table',
    label: 'Table',
    element: <Table />,
  },
];

export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router) => {
    return {
      path: router.path,
      element: <Layout>{router.element}</Layout>,
      errorElement: <Error404 />,
    };
  }),
);
