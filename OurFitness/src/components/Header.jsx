import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Button,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HomeIcon from '@mui/icons-material/Home';
import DrawerComp from "./DrawerComp";
import { NavLink } from "react-router-dom";
import "../components/Header.css";

const PAGES = [
  { label: "Home", link: "/home" },
  { label: "About", link: "/about" },
  { label: "Sign in", link: "/signin" },
  { label: "Sign up", link: "/signup" },
];

function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      <AppBar sx={{ background: "#002B5B" }}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            <FitnessCenterIcon />
            OurFitness
          </Typography>
          {isMatch ? (
            <DrawerComp setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
          ) : (
            <nav>
              {PAGES.map((page, index) => (
                
                <NavLink
                  className={"NavLink"}
                  to={page.link}
                  exact
                  activeStyle={{ fontWeight: "bold" }}
                  style={{
                    marginRight: "10px",
                    color: "white",
                    textDecoration: "none",
                    margin: "10px",
                  }}
                  key={index}
                >
                  {page.label} 
                </NavLink>
              ))}
            </nav>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}

export default Header;
