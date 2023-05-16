import { Container, Typography } from "@mui/material";
import Header from "./components/Header";
import { BrowserRouter, NavLink, Route, Routes  } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";


function App() {
  let activeClassName = "nav-active"
  return (
    <BrowserRouter>
    
      <Header />

    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>



  );
}

export default App;
