import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  Drawer,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "./CustomButton";
import Axios from "../AxiosInstance";
import Cookies from "js-cookie";
import { useContext } from "react";
import GlobalContext from "../Context/GlobalContext";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import "./Navbar.css";

const Navbar = ({ handleOpen = () => {} }) => {
  const { user, setUser } = useContext(GlobalContext);
  const [startFetch, setstartFetch] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const PAGES = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Routine", link: "/routine" },
  ];

  const fetchUser = async () => {
    const userToken = Cookies.get("UserToken");
    return await Axios.get("/me", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  };

  useEffect(() => {
    const userToken = Cookies.get("UserToken");
    setstartFetch(!(userToken == null || userToken == "undefined"));
  }, [user]);

  useQuery("user", fetchUser, {
    onSuccess: (data) => {
      setUser({
        username: data.data.data.username,
        email: data.data.data.email,
      });
    },
    enabled: startFetch,
  });

  const logout = () => {
    setUser();
    Cookies.remove("UserToken");
  };

  const isTabletMobile = useMediaQuery("(max-width: 1075px)");

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        zIndex: 10,
        padding: "16px",
        backgroundColor: "#002B5B",
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={8} md={6}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FitnessCenterIcon sx={{ color: "white" }} />
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold", color: "white" }}
            >
              OurFitness
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={4}
          md={6}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          {isTabletMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ color: "white" }}
              >
                {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>

              <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                PaperProps={{
                  sx: { width: "275px", backgroundColor: "#002B5B" },
                }}
              >
                <Stack sx={{ p: 2 }}>
                  <IconButton
                    color="inherit"
                    aria-label="close drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                    sx={{ ml: "auto", color: "white", marginBottom: "30px" }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <nav>
                    {PAGES.map((page, index) => (
                      <NavLink
                        className={"NavLink"}
                        to={page.link}
                        exact
                        activeStyle={{ fontWeight: "bold" }}
                        style={{
                          color: "white",
                          textDecoration: "none",
                        }}
                        key={index}
                      >
                        {page.label}
                      </NavLink>
                    ))}
                  </nav>
                  {user ? (
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap="2rem"
                      color="white"
                      marginTop={"25px"}
                      marginLeft={"25px"}
                    >
                      <Typography>Account: {user.username}</Typography>
                      <CustomButton text="Log out" handle={logout} />
                    </Stack>
                  ) : (
                    <Box
                      direction="row"
                      alignItems="center"
                      gap="2rem"
                      color="white"
                      marginTop={"25px"}
                    >
                      <CustomButton text="Log in" handle={handleOpen} />
                    </Box>
                  )}
                </Stack>
              </Drawer>
            </>
          ) : (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
              spacing={2}
            >
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
              {user ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  gap="2rem"
                  color="white"
                >
                  <Typography>Account: {user.username}</Typography>
                  <CustomButton text="Log out" handle={logout} />
                </Stack>
              ) : (
                <Box color="white">
                  <CustomButton text="Log in" handle={handleOpen} />
                </Box>
              )}
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Navbar;
