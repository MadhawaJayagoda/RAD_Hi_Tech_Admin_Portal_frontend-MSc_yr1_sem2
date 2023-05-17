import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ImageSlider from "./components/ImageSlider";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";

function JobDetails() {
  let history = useHistory();
  const backNav = () => {
    history.push("/pending");
  };

  return (
    <div className="JobDetailsCard">
      <Card sx={{ minWidth: 275, backgroundColor: "#D9D9D9" }}>
        <CardContent>
          <div
            style={{
              paddingLeft: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h2>
              {" "}
              <div>
                <span onClick={backNav}>
                  <IconButton>
                    <ArrowBackIosIcon sx={{ marginRight: "5px" }} />
                  </IconButton>
                </span>
                Job Details{" "}
              </div>
            </h2>
            <h3 style={{ paddingTop: "20px" }}> Date: 2023-05-06</h3>
          </div>
          <div style={{ paddingLeft: "10px", marginTop: "20px" }}>
            Job ID: <span> 54217869</span>
          </div>
          <div className="jobDetailsContent">
            <ImageSlider />
          </div>
          <div className="jobButtons">
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="success"
                sx={{ width: 300, height: 50 }}
                style={{ marginRight: "20px" }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ width: 300, height: 50 }}
              >
                Reject
              </Button>
            </Stack>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default JobDetails;
