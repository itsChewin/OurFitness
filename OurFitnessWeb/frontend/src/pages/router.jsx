import { createBrowserRouter,BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../share/components/Layout';
import Home from './home/Home';
import Routine from './home/Routine';
import Note from './note/Note';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/routine', element: <Routine /> },
      { path: '/note/:noteId', element: <Note /> },
    ],
  },
  
]);

export default router;
