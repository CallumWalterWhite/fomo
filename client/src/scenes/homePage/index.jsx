import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, Modal, Select, MenuItem, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import LocationListWidget from "scenes/widgets/LocationListWidget";
import { setUserLocation } from "state";

const HomePage = () => {
  const dispatch = useDispatch();
  const userLocation = useSelector((state) => state.currentLocation); // Assuming userLocation is stored in Redux state
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [isModalOpen, setIsModalOpen] = useState(!userLocation);

  const handleLocationChange = (event) => {
    dispatch(setUserLocation({ location: event.target.value }));
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(!userLocation);
  }, [userLocation]);

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
          <Select label="Select Location" value={userLocation} onChange={handleLocationChange}>
            <MenuItem value="Derby">Derby</MenuItem>
            {/* Add more location options as needed */}
          </Select>
          <Button variant="contained" onClick={() => setIsModalOpen(false)}>
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
          <UserWidget />
          <Box m="2rem 0" />
          <LocationListWidget />
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
