import {
  EditOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import LocationImage from "components/LocationImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LocationWidget = ({ locationId, picturePath }) => {
  const [location, setLocation] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getLocation = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/location/${locationId}`, {
      method: "GET"
    });
    const data = await response.json();
    setLocation(data);
  };

  useEffect(() => {
    getLocation();
  }, []); 

  if (!location) {
    return null;
  }

  const {
    _id,
    title,
    thumbnail,
    complete_address,
    description
  } = location;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${_id}`)}
      >
        <FlexBetween gap="1rem">
          <LocationImage image={thumbnail} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {title}
            </Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{complete_address.city}</Typography>
        </Box>
        <Box display="block" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography className="info-item">
            {location.description}
          </Typography>
          <Typography className="info-item">
            {location.complete_address.street}, {location.complete_address.city}, {location.complete_address.postal_code}
          </Typography>
          <Box gap="1rem"></Box>
          <Typography className="info-item">
            {location.phone}
          </Typography>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default LocationWidget;
