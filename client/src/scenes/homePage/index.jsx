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
import { setUserLocation } from "state";

const HomePage = () => {
  const dispatch = useDispatch();
  const userLocation = useSelector((state) => state.currentLocation) || "";
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [selectedLocation, setSelectedLocation] = useState(userLocation);
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
      const response = await fetch("http://localhost:6001/cities");
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
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
            bgcolor: "white",
            p: 3,
            minWidth: 300,
            textAlign: "center",
          }}
        >
          <Select label="Select Location" value={selectedLocation} onChange={handleLocationChange}>
            {cities.map((city) => (
              <MenuItem key={city.CityId} value={city}>
                {city.Name}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" onClick={handleConfirm}>
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
                <Typography color={medium} style={{ cursor: "pointer" }}>
                  {userLocation?.Name}
                </Typography>
              </Box>
            </Box>
          </WidgetWrapper>
          <Box m="2rem 0" />
          {/* <LocationListWidget /> */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPostWidget picturePath={picturePath} /> */}
          <PostsWidget userId={null} />
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
