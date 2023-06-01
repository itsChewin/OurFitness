import {
  createBrowserRouter,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "../share/components/Layout";
import Home from "./home/Home";
import About from "./home/About";
import Routine from "./home/Routine";
import Note from "./note/Note";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/routine", element: <Routine /> },
      { path: "/note/:noteId", element: <Note /> },
    ],
  },
]);

export default router;
