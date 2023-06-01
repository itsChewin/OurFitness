import React from "react";
import { Box, Typography } from "@mui/material";
import { format } from "fecha";

const RoutineCard = ({ title = "", date = "", handleClick = () => {} }) => {
  return (
    <Box
      onClick={handleClick}
      sx={{
        backgroundColor: "#EA5455",
        padding: "6px 18px",
        borderRadius: 3,

        cursor: "pointer",

        "&:hover": {
          backgroundColor: "#EA5455",
          transform: "scale(1.05)",
          transition: "all 0.1s ease-in-out",
        },
      }}
    >
      <Typography
        fontSize={26}
        paddingY={2}
        sx={{ color: "white" }}
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {title}
      </Typography>
      <Typography align="right" fontSize={14} sx={{ color: "white" }}>
        {format(new Date(date), "DD/MM/YYYY hh:mm A")}
      </Typography>
    </Box>
  );
};

export default RoutineCard;
