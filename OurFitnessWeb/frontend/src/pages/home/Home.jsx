import React from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  useTheme,
} from "@mui/material";
import imageSrc from "../../assets/Strongman.jpg";
import imageSrc1 from "../../assets/peoplecycling.jpg";
import imageSrc2 from "../../assets/weightexercise.jpg";
import imageSrc3 from "../../assets/fitnessman.jpg";
import "../../App.css";

function Home() {
  const theme = useTheme();

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
          height="95%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(0, 0, 0, 0.5)"
          padding="20px"
        >
          <Typography
            variant="h1"
            component="h1"
            color="white"
            sx={{
              fontWeight: "bold",
              fontSize: "4rem",
              textAlign: "center",
            }}
          >
            "OurFitness"
          </Typography>
        </Box>
      </Box>

      <Container sx={{ marginBottom: "150px" }}>
        <Typography
          variant="h2"
          component="h1"
          align="center"
          paddingTop={theme.breakpoints.up("sm")}
          sx={{ fontWeight: "bold", margin: "50px" }}
        >
          Welcome to Our Website
        </Typography>
        <Typography
          variant="h6"
          component="p"
          align="center"
          paddingY={theme.breakpoints.up("sm")}
          sx={{ margin: "50px" }}
        >
          We are the web app that can help you reminder your workout. We allow
          users to set goals to see their progress.
        </Typography>

        <Grid container spacing={4} marginBottom={theme.spacing(8)}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Image"
                width="250px"
                height="250px"
                image={imageSrc1}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Set Routine
                </Typography>
                <Typography variant="body2" component="p">
                  Set a personalized workout routine by creating a note to
                  remind the exercises routine.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Image"
                width="250px"
                height="250px"
                image={imageSrc2}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Set Goals
                </Typography>
                <Typography variant="body2" component="p">
                  Set specific fitness goals, such as running a certain distance
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
                width="250px"
                height="250px"
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
