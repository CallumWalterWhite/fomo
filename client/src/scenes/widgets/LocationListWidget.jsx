import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocations } from "state";

const LocationListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const locations = useSelector((state) => state.user.locations);

  const getLocations = async () => {
    const response = await fetch(
      `http://localhost:6001/location/all`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setLocations({ locations: data }));
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
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {locations.map((location) => (
          <div>{location.title}</div>
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default LocationListWidget;
