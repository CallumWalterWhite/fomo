import React, { useState } from "react";
import Slider from "react-slick";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Location from "components/Location";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MediaWidget = ({ _id, locationId, images }) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const primary = palette.primary.main;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slider-item">
            <img src={image.thumbnail} alt={`Image ${index} - ${image.title}`} />
          </div>
        ))}
      </Slider>
    </WidgetWrapper>
  );
};

export default MediaWidget;
