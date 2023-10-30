import { Box, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const getUser = async () => {
    const response = await fetch(`http://localhost:6001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="75%"
        padding="2rem 6%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="auto"
        gap="2rem"
      >
        <Box width="100%" mt="2rem">
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            centered
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Posts" />
            <Tab label="Media" />
            <Tab label="About" />
            {/* Add more tabs if needed */}
          </Tabs>
          {selectedTab === 0 && (
            <PostsWidget userId={userId} isProfile />
          )}
          {selectedTab === 1 && (
            <PostsWidget userId={userId} isProfile />
          )}
          {selectedTab === 2 && (
            <PostsWidget userId={userId} isProfile />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
