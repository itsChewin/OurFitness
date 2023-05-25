import React, { useEffect, useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import CustomButton from './CustomButton';
import Axios from '../AxiosInstance';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import GlobalContext from '../Context/GlobalContext';
import { useQuery } from 'react-query';
import { NavLink } from "react-router-dom";
import './Navbar.css';
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const Navbar = ({ handleOpen = () => {} }) => {
  const { user, setUser } = useContext(GlobalContext);
  const [startFetch, setstartFetch] = useState(false);

  const PAGES = [
    { label: "Home", link: "/" },
    { label: "Routine", link: "/routine" },
  ];

  const fetchUser = async () => {
    const userToken = Cookies.get('UserToken');
    return await Axios.get('/me', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  };

  useEffect(() => {
    const userToken = Cookies.get('UserToken');
    setstartFetch(!(userToken == null || userToken == 'undefined'));
  }, [user]);

  useQuery('user', fetchUser, {
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
    Cookies.remove('UserToken');
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        zIndex: 10,
        marginBottom: '8px',
        padding: '16px',
        backgroundColor: '#002B5B',
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={4} md={6}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FitnessCenterIcon sx={{ color: 'white' }} />
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: "bold", color: "white" }}>
              OurFitness
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={4} md={6}>
          <Stack direction="row" alignItems="center" justifyContent={{ xs: 'flex-start', md: 'flex-end' }} spacing={2}>
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
              <Stack direction="row" alignItems="center" gap="2rem" color="white">
                <Typography>Account: {user.username}</Typography>
                <CustomButton text="Log out" handle={logout} />
              </Stack>
            ) : (
              <Box color="white">
                <CustomButton text="Log in" handle={handleOpen} />
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Navbar;
