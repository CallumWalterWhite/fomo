import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        {/* <Typography color={medium}>Create Ad</Typography> */}
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://www.godine.co.uk/assets/restaurant/1683/image/5/image-the-distillery-derby-image-5a.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Distillery</Typography>
        <Typography color={medium}>Derby</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
          Bi-level pub with exposed brick, offering contemporary bar fare, creative cocktails & outdoor seats
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
