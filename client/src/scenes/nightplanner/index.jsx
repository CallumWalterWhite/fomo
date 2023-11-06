import { Box, Tab, Tabs, useMediaQuery, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import PostsWidget from "scenes/widgets/PostsWidget";
import LocationWidget from "scenes/widgets/LocationWidget";
import MediaWidget from "scenes/widgets/MediaWidget";
import WidgetWrapper from "components/WidgetWrapper";

const NightPlannerPage = () => {
  const { locationId } = useParams();
  const [location, setLocation] = useState(null);
  const { palette } = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const getLocation = async () => {
    console.log(locationId);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/location/${locationId}`, {
      method: "GET"
    });
    const data = await response.json();
    setLocation(data);
  };

  useEffect(() => {
    getLocation();
  }, []); 

  if (!location) return null;

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
      </Box>
    </Box>
  );
};

export default NightPlannerPage;
