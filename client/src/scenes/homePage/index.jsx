import React, { useState, useEffect } from "react";
import {
  LocationOnOutlined,
} from "@mui/icons-material";
import { Box, useMediaQuery, Typography, useTheme, Modal, Select, MenuItem, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "scenes/navbar";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import WidgetWrapper from "components/WidgetWrapper";
import LocationListWidget from "scenes/widgets/LocationListWidget";
import { setUserLocation } from "state";

const HomePage = () => {
  const dispatch = useDispatch();
  const userLocation = useSelector((state) => state.currentLocation) || "";
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [selectedLocation, setSelectedLocation] = useState(userLocation.Name);
  const [isModalOpen, setIsModalOpen] = useState(!userLocation);
  const [isModalReopened, setIsModalReopened] = useState(false);
  const [cities, setCities] = useState([]); 
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cities`);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities!:", error);
    }
  };

  const handleConfirm = () => {
    dispatch(setUserLocation({ location: selectedLocation }));
    setIsModalOpen(false);
    setIsModalReopened(false);
  };

  const handleLocationClick = () => {
    setIsModalReopened(true);
  };

  useEffect(() => {
    setIsModalOpen(!userLocation || isModalReopened);
    fetchData();
  }, [userLocation, isModalReopened]);

  return (
    <Box>
      <Navbar />
      <Modal open={isModalOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: palette.background.paper, // Set background color using palette
            color: palette.text.primary, // Set text color using palette
            p: 3,
            minWidth: 300,
            textAlign: "center",
          }}
        >
          <Select
            label="Select Location"
            value={selectedLocation}
            onChange={handleLocationChange}
            sx={{ width: "100%", mb: 2, color: palette.text.primary }} // Set select styles using palette
          >
            {cities.map((city) => (
              <MenuItem key={city.CityId} value={city}>
                {city.Name}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            onClick={handleConfirm}
            sx={{ backgroundColor: palette.primary.main, color: palette.primary.contrastText }} // Set button styles using palette
          >
            Confirm
          </Button>
        </Box>
      </Modal>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <WidgetWrapper>
            <Box p="1rem 0">
              <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem" onClick={handleLocationClick}>
                <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                <Typography color={palette.text.primary} style={{ cursor: "pointer" }}>
                  {userLocation?.Name}
                </Typography>
              </Box>
            </Box>
          </WidgetWrapper>
          <Box m="2rem 0" />
          {userLocation && <LocationListWidget cityId={userLocation?.CityId} cityName={userLocation?.Name} />}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {userLocation && <PostsWidget cityId={userLocation?.CityId} />}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
