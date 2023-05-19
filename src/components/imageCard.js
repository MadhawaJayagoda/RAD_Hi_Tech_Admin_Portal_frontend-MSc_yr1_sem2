import * as React from "react";
import CardMedia from "@mui/material/CardMedia";

export default function ActionAreaCard({ imgHeight }) {
  return (
    <CardMedia
      component="img"
      sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
      image={process.env.PUBLIC_URL + "/images/logo.svg"}
      alt="green iguana"
    />
  );
}
