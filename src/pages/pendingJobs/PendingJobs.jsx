import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BasicBox from "./components/BasicBox";
import { pendingJobs } from "./PendingJobsData";

function PendingJobs() {
  return (
    <div className="pendingJobsCard">
      <Card sx={{ minWidth: 275, backgroundColor: "#D9D9D9" }}>
        <CardContent>
          <div style={{ paddingLeft: "10px" }}>
            <h2>Requests to Approve</h2>
          </div>
          <div className="pendingCardContent">
            {pendingJobs.map((val, index) => {
              return <BasicBox job={val} key={index} />;
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PendingJobs;
