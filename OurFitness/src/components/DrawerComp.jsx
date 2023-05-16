import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import "../components/Header.css"

const pages = ["Home", "About","Sign in","Sign up"];

const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        
      >
        <List sx={{ background: "#002B5B" }}>
  {pages.map((page, index) => (
    <ListItemButton key={index} >
      <ListItemIcon >
        <NavLink
          className={"NavLink"}
          to={page === "Sign in" ? "/signin" : page === "Sign up" ? "/signup" : `/${page.toLowerCase()}`}
          exact
          style={{ textDecoration: "none", color: "White" }}
          activeStyle={{ fontWeight: "bold" }}
          
        >
          {page}
        </NavLink>
      </ListItemIcon>
    </ListItemButton>
  ))}
</List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </Box>
  );
};

export default DrawerComp;
