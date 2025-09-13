import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import AnimalsOverview from './pages/AnimalsOverview';
import AnimalDetail from './components/animals/AnimalDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'animals', element: <AnimalsOverview /> },
      { path: 'animals/:id', element: <AnimalDetail /> },
    ],
  },
]);

export default function AppRouter() {
return (
<RouterProvider router={router} />
);
}


