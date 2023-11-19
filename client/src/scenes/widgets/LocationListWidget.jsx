import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";

const LocationListWidget = ({ cityId, cityName, category, category_name }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const [locations, setlocations] = useState([]); 

  const getLocations = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/location/c/${cityId}`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      dispatch(setlocations(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getLocations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const locations_filtered = locations.filter((location) => location.main_category === category);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        {category_name} in {cityName}
      </Typography>
      <Box
        className="scroll-container"
        maxHeight="300px"
        overflowY="auto"
        display="flex"
        flexDirection="column"
        gap="0.5rem"
      >
        {locations_filtered.map((location) => (
          <Link
            to={`/profile/${location._id}`}
            key={location._id}
            style={{
              textDecoration: "none", // Remove underline
              color: palette.neutral.main, // Set link color to primary color
              fontWeight: 500, // Set font weight to bold
              fontSize: "1rem", // Set font size
              transition: "color 0.3s ease", // Add smooth color transition
              cursor: "pointer", // Add pointer on hover
            }}
            // Hover effect to change text color on hover
            onMouseEnter={(e) => (e.target.style.color = palette.neutral.dark)}
            onMouseLeave={(e) => (e.target.style.color = palette.neutral.main)}
          >
            {location.title}
          </Link>
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default LocationListWidget;
