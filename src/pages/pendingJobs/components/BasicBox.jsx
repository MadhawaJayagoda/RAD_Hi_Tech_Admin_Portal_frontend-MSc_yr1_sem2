import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";

function BasicBox({ job }) {
  return (
    <Box sx={boxStyles}>
      <h5 style={{ paddingTop: "8px", paddingLeft: "20px" }}>
        {" "}
        Job ID - {job.InspectionID}
      </h5>
      <Button
        sx={{ backgroundColor: "#8083CBD" }}
        variant="contained"
        endIcon={<SendIcon />}
      >
        {" "}
        <Link
          to={{
            pathname: "/jobdetails",
            state: { jobData: job, haveState: false },
          }}
          style={{ textDecoration: "none" }}
        >
          View
        </Link>
      </Button>
    </Box>
  );
}

const boxStyles = {
  p: 1,
  width: "98%",
  height: 60,
  marginY: 2,
  backgroundColor: "primary.dark",
  border: "1px solid grey",
  backgroundColor: "#B5B6FF",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  verticalAlign: "middle",
};

export default BasicBox;
