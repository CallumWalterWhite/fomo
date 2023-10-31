import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import LocationImage from "./LocationImage";

const Location = ({ locationdata_id, name, city, locationImagePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <LocationImage image={locationImagePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${locationdata_id}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {city}
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Location;
