import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PieChartDisplay from "./pieChart";
import { CardHeader } from "@mui/material";

const sampledata = [
  { title: "One", value: 10, color: "#E38627" },
  { title: "Two", value: 15, color: "#C13C37" },
  { title: "Three", value: 20, color: "#6A2135" },
];

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();

const formattedDate = `${year}-${month.toString().padStart(2)}-${day
  .toString()
  .padStart(2)}`;

function SquareCard(props) {
  return (
    <Card>
      <CardHeader
        title="Summary of Inspection Jobs"
        subheader={formattedDate}
      />
      <CardContent sx={{ justifyContent: "center", padding: 10 }}>
        <PieChartDisplay summaryData={props.summaryData} />
      </CardContent>
    </Card>
  );
}

export default SquareCard;
