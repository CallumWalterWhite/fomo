import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Link,
  useTheme,
  useMediaQuery,
  Popover
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  Map,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:6001/location/search/${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
      setAnchorEl(document.getElementById("search-input"));
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }
  };

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          FOMO
        </Typography>
        {isNonMobileScreens && (
           <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
            <InputBase
              placeholder="Search..."
              id="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton onClick={handleSearch}>
              <Search />
            </IconButton>
            {/* Popover displaying search results */}
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Box p={2}>
                {searchResults.map((result) => (
                  <Link style={{
                    textDecoration: "none"}} key={result._id} href={`/profile/${result._id}`} target="_blank" rel="noopener noreferrer">
                    <Typography style={{
                      textDecoration: "none", // Remove underline
                      color: theme.palette.neutral.main, // Set link color to primary color
                      transition: "color 0.3s ease", // Add smooth color transition
                      cursor: "pointer", // Add pointer on hover
                    }}
                    onMouseEnter={(e) => (e.target.style.color = theme.palette.neutral.dark)}
                    onMouseLeave={(e) => (e.target.style.color = theme.palette.neutral.main)}>{result.title}</Typography>
                  </Link>
                ))}
              </Box>
            </Popover>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton onClick={() => dispatch(setMode())}>
            <Map sx={{ color: dark, fontSize: "25px" }} />
          </IconButton>
          <Help sx={{ fontSize: "25px" }} />
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
