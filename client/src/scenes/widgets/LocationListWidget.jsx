import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocations } from "state";

const LocationListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const locations = useSelector((state) => state.user.locations || []);

  const getLocations = async () => {
    try {
      const response = await fetch(`http://localhost:6001/location/all`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      dispatch(setLocations({ locations: data }));
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, show a message to the user, or retry the request
    }
  };

  useEffect(() => {
    getLocations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Bars, Pubs and Clubs in City 
      </Typography>
      <Box
          className="scroll-container"
          maxHeight="300px"
          overflowY="auto"
          display="flex" 
          flexDirection="column" 
          gap="0.5rem"
      >
        {locations.map((location) => (
          <span key={location.id}>{location.title}</span>
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default LocationListWidget;
