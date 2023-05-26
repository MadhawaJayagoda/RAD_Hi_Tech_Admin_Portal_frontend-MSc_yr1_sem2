import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function HistoryActions(props) {
  const actionHistory = props.actionHistory;
  const sortedActionHistory = [...actionHistory].sort(
    (a, b) => new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime()
  );
  return (
    <div className="pendingJobsCard">
      <Card sx={{ minWidth: 275, backgroundColor: "#D9D9D9" }}>
        <CardContent>
          <div style={{ paddingLeft: "10px" }}>
            <h2>Actions History</h2>
          </div>
          <div style={{ margin: "50px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }} align="center">
                      User
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="center">
                      Timestamp
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="center">
                      InspectionJob ID
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedActionHistory.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        align="left"
                        component="th"
                        scope="row"
                        sx={{ paddingLeft: "30px" }}
                      >
                        {row.user}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {new Date(row.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.actionType}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {row.inspectionJobID}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default HistoryActions;
