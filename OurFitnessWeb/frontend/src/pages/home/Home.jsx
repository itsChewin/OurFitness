import React from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import imageSrc from "../../assets/Strongman.jpg";
import imageSrc1 from "../../assets/peoplecycling.jpg";
import imageSrc2 from "../../assets/weightexercise.jpg";
import imageSrc3 from "../../assets/fitnessman.jpg";
import '../../App.css'



function Home() {
  return (
    <>
      <Box position="relative">
        <img
          src={imageSrc}
          alt="Big Image"
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(0, 0, 0, 0.5)"
        >
          <Typography
            variant="h1"
            component="h1"
            color="white"
            sx={{ fontWeight: "bold" }}
          >
            "OurFitness"
          </Typography>
        </Box>
      </Box>

      <Container>
        <Typography
          variant="h2"
          component="h1"
          align="center"
          paddingTop={"50px"}
          sx={{ fontWeight: "bold" }}
        >
          Welcome to Our Website
        </Typography>
        <Typography variant="h6" component="p" align="center" paddingY={"50px"}>
          We are the web app that can help you to tracking you workout. We
          allows users to set goals and track your process.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Image"
                height="200"
                image={imageSrc1}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Set Routine
                </Typography>
                <Typography variant="body2" component="p">
                  create a personalized workout routine by selecting the types
                  of exercises
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Image"
                height="200"
                image={imageSrc2}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Set Goals
                </Typography>
                <Typography variant="body2" component="p">
                  set specific fitness goals, such as running a certain distance
                  or lifting a particular weight.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Image"
                height="200"
                image={imageSrc3}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Social Connect
                </Typography>
                <Typography variant="body2" component="p">
                  Users can share their progress, offer encouragement, and get
                  inspiration from others.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
