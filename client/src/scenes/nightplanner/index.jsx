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
    const response = await fetch(`http://localhost:6001/location/${locationId}`, {
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
        <Box width="100%" mt="2rem">
          <LocationWidget locationId={location._id} picturePath={location.thumbnail} />
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
            <PostsWidget locationId={location._id} isProfile />
          )}
          {selectedTab === 1 && (
            <MediaWidget locationId={location._id} images={location.images} />
          )}
          {selectedTab === 2 && (
            <WidgetWrapper className="location-widget"><Typography variant="h4" sx={{ color: main, marginBottom: "1rem" }}>
            {location.title}
          </Typography>
            <div className="location-info">
              <Typography className="info-item">
                <strong>Description:</strong> {location.description}
              </Typography>
              <Typography className="info-item">
                <strong>Address:</strong> {location.complete_address.street}, {location.complete_address.city}, {location.complete_address.postal_code}
              </Typography>
              <Typography className="info-item">
                <strong>Phone:</strong> {location.phone}
              </Typography>
              <Typography className="info-item">
                <strong>Website:</strong>{" "}
                <a href={location.website} target="_blank" rel="noopener noreferrer">
                  {location.website}
                </a>
              </Typography>
              <Typography className="info-item">
                <strong>Opening Hours:</strong>
                <ul className="opening-hours">
                  {location.hours.map((day, index) => (
                    <li key={index}>
                      <strong>{day.day}:</strong> {day.times[0]}
                    </li>
                  ))}
                </ul>
              </Typography>
              <Typography className="info-item">
                <strong>Categories:</strong> {location.categories.join(", ")}
              </Typography>
              <Typography className="info-item">
                <strong>Menu Link:</strong>{" "}
                <a href={location.menu.link} target="_blank" rel="noopener noreferrer">
                  {location.menu.link}
                </a>
              </Typography>
              <Typography className="info-item">
                <strong>Owner:</strong>{" "}
                <a href={location.owner.link} target="_blank" rel="noopener noreferrer">
                  {location.owner.name}
                </a>
              </Typography>
            </div>
          </WidgetWrapper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NightPlannerPage;