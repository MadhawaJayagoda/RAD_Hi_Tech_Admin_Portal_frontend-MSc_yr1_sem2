import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ImageSlider from "./components/ImageSlider";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { IconButton } from "@mui/material";
import formatDate from "./utils/formatDate";
import axios from "axios";

function JobDetails() {
  const location = useLocation();
  const { jobData, haveState } = location.state;
  const [remarks, setRemarks] = useState("");
  const [jobDetails, setJobData] = useState(null);

  let history = useHistory();
  const currentUser = localStorage.getItem("user");
  var parsedUser = JSON.parse(currentUser);
  const UPDATE_INSPECTION = "/inspection/update/info";

  const backNav = () => {
    if (jobDetails.Approvedby && !haveState) {
      confirmAlert({
        title: "Are you sure ?",
        message:
          "There are some changes in the inspection job that you have made. Do you want to submit them first ?",
        buttons: [
          {
            label: "Okay",
          },
          {
            label: "Exit",
            onClick: () => history.goBack(),
          },
        ],
      });
    } else {
      history.goBack();
    }
  };

  useEffect(() => {
    setJobData(location.state.jobData);
  }, [location.state]);

  const handleApprove = (e) => {
    e.preventDefault();
    const newJobDetails = { ...jobDetails };
    newJobDetails.Status = "approved";
    newJobDetails.Approvedby = parsedUser.FirstName;
    setJobData(newJobDetails);
    toast.success("Job Approved!");
  };

  const handleReject = (e) => {
    e.preventDefault();
    const newJobDetails = { ...jobDetails };
    newJobDetails.Status = "rejected";
    newJobDetails.Approvedby = parsedUser.FirstName;
    setJobData(newJobDetails);
    toast.success("Job Rejected!");
  };

  const submitData = async (e) => {
    e.preventDefault();
    const newJobDetails = { ...jobDetails };
    newJobDetails.Remarks = remarks;
    setRemarks("");
    if (
      newJobDetails.InspectionID != "" &&
      newJobDetails.Approvedby != "" &&
      newJobDetails.Status != "" &&
      newJobDetails.Remarks != ""
    ) {
      const response = await axios.patch(
        UPDATE_INSPECTION,
        {
          InspectionID: newJobDetails._id,
          Approvedby: newJobDetails.Approvedby,
          Status: newJobDetails.Status,
          Remarks: newJobDetails.Remarks,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Successfully submitted!");
        history.push("/");
        window.location.reload();
      } else {
        toast.error("Something went wrong!");
      }
    } else {
      toast.error("Please fill in all fields!");
    }
  };

  return (
    <div className="JobDetailsCard">
      <Card sx={{ minWidth: 1100, backgroundColor: "#D9D9D9" }}>
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
            <h3 style={{ paddingTop: "20px" }}>
              {" "}
              Date: {formatDate(jobDetails.CreatedDate)}
            </h3>
          </div>
          <div style={{ paddingLeft: "25px", marginTop: "20px" }}>
            <span>
              <Typography variant="subtitle1">
                Job ID:
                {jobDetails.InspectionID}{" "}
              </Typography>
              <Typography variant="subtitle1">
                Container ID:
                {jobDetails.ContainerID}{" "}
              </Typography>
              <Typography variant="subtitle1">
                Status:
                {jobDetails.Status}{" "}
              </Typography>
            </span>
          </div>
          <div className="jobDetailsContent">
            <ImageSlider imageUrls={jobData.Images} />
          </div>
          {jobDetails.Status === "pending" ? (
            <div>
              <div className="jobButtons">
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ width: 300, height: 50 }}
                    style={{ marginRight: "20px" }}
                    onClick={handleApprove}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ width: 300, height: 50 }}
                    onClick={handleReject}
                  >
                    Reject
                  </Button>
                </Stack>
              </div>
              <div className="feedback-form">
                <form onSubmit={submitFeedback}>
                  <label>Remarks:</label>
                  <textarea
                    id="feedback"
                    name="feedback"
                    onChange={(e) => setRemarks(e.target.value)}
                    value={remarks}
                    placeholder="Enter your feedback here..."
                    rows={5}
                  />
                  <button type="submit" onClick={submitData}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          ) : (
            {}
          )}
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default JobDetails;
