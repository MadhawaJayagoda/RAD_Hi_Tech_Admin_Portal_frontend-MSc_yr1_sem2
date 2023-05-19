import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function ImageSlider({ imageUrls }) {
  var settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  return (
    <Slider
      {...settings}
      style={{
        margin: "20px",
        maxWidth: "1000px",
        minWidth: "500px",
      }}
    >
      {imageUrls.map((url) => (
        <div key={url}>
          <img src={url} alt="" />
        </div>
      ))}
    </Slider>
  );
}

export default ImageSlider;
