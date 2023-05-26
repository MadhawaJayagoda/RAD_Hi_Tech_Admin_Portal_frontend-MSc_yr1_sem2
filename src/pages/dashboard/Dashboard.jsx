import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import SquareCard from "./components/squareCard";
import TextCard from "./components/textCard";

function Dashboard(props) {
  const accepted = props.summaryData.accepted;
  const rejected = props.summaryData.rejected;
  const pending = props.summaryData.pending;

  const calculateRates = () => {
    const total = accepted + rejected + pending;
    const acceptanceRate = ((accepted / total) * 100).toFixed(1);
    const rejectionRate = ((rejected / total) * 100).toFixed(1);
    const pendingRate = ((pending / total) * 100).toFixed(1);

    return { acceptanceRate, rejectionRate, pendingRate };
  };
  const { acceptanceRate, rejectionRate, pendingRate } = calculateRates();
  return (
    <div className="pendingJobsCard">
      <Card sx={{ minWidth: 275, backgroundColor: "#D9D9D9" }}>
        <CardContent>
          <div className="pendingCardContent">
            <Grid gridLayout rowSpacing={1}>
              <Grid>
                <SquareCard summaryData={props.summaryData} />
              </Grid>
              <Grid>
                <Grid>
                  <Box>
                    <TextCard
                      style={{ marginTop: "8px" }}
                      title={"Acceptance rate"}
                      rate={acceptanceRate}
                    />
                    <TextCard
                      style={{ marginTop: "20px" }}
                      title={"Rejection Rate"}
                      rate={rejectionRate}
                    />
                    <TextCard
                      style={{ marginTop: "20px" }}
                      title={"Pending Rate"}
                      rate={pendingRate}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
