import React from "react";
import { Box, Typography, Container } from "@mui/material";
import imageSrc from "../../assets/Strongman.jpg";
function About() {
  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: "center", margin: "20px" }}
      >
        About us
      </Typography>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "30vh",
        }}
      >
        <img
          src={imageSrc}
          alt="Big Image"
          style={{
            width: "800px",
            height: "auto",
            objectFit: "cover",
            maxWidth: "100%",
          }}
        />
      </div>

      <Container sx={{ marginTop: "50px", marginBottom: "150px" }}>
        <Typography
          variant="p"
          component="p"
          sx={{ textAlign: "left", margin: "20px" }}
        >
          Once upon a time, in a world where fitness was a way of life, there
          was a vibrant online community known as "OurFitness." This web app
          served as a hub for fitness enthusiasts of all levels, providing them
          with a platform to track their workouts, set goals, and connect with
          like-minded individuals.
        </Typography>
        <Typography
          variant="p"
          component="p"
          sx={{ textAlign: "left", margin: "20px" }}
        >
          As users logged into the OurFitness website, they were greeted by a
          captivating image that showcased the power and determination of
          individuals engaged in various fitness activities. The image served as
          a constant reminder of the incredible possibilities that lay ahead for
          each user.
        </Typography>
        <Typography
          variant="p"
          component="p"
          sx={{ textAlign: "left", margin: "20px" }}
        >
          The website's homepage boasted a user-friendly interface, designed to
          inspire and motivate. The creators understood that fitness journeys
          were unique to each individual, and so, they developed personalized
          features to cater to every user's needs. With just a few clicks, users
          could create their very own workout routine, choosing from a vast
          selection of exercises tailored to their preferences and goals.
        </Typography>
        <Typography
          variant="p"
          component="p"
          sx={{ textAlign: "left", margin: "20px" }}
        >
          Setting goals became an integral part of the OurFitness experience.
          Users could define specific fitness milestones they wished to achieve,
          whether it was running a certain distance, lifting a particular
          weight, or mastering a challenging yoga pose. As users progressed on
          their fitness journeys, the web app provided them with detailed
          insights and progress tracking, allowing them to celebrate their
          accomplishments and stay motivated.
        </Typography>
        <Typography
          variant="p"
          component="p"
          sx={{ textAlign: "left", margin: "20px" }}
        >
          One of the most remarkable aspects of OurFitness was its emphasis on
          community. The web app encouraged users to connect with fellow fitness
          enthusiasts, sharing their progress, offering encouragement, and
          finding inspiration in the stories of others. It became a space where
          friendships were forged, and support was readily available. Users
          could participate in challenges, join virtual fitness classes, and
          engage in lively discussions, creating a strong sense of belonging
          within the OurFitness community.
        </Typography>
        <Typography
          variant="p"
          component="p"
          sx={{ textAlign: "left", margin: "20px" }}
        >
          As time went on, OurFitness continued to evolve and adapt to the
          ever-changing landscape of fitness. The web app introduced new
          features, incorporated cutting-edge technologies, and collaborated
          with renowned fitness experts to provide the best resources and
          guidance to its users.
        </Typography>
      </Container>
    </>
  );
}

export default About;
