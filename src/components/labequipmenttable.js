import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const rows = [
  {
    step: 1,
    method: "DNA Extraction",
    startTime: "08:00",
    endTime: "08:45",
    status: "Completed",
    volume: "50μl",
    comments: "No issues",
  },
  {
    step: 2,
    method: "PCR Setup",
    startTime: "09:00",
    endTime: "09:30",
    status: "Completed",
    volume: "25μl",
    comments: "Handled smoothly",
  },
  {
    step: 3,
    method: "Sample Purification",
    startTime: "10:00",
    endTime: "10:40",
    status: "Completed",
    volume: "100μl",
    comments: "Efficient processing",
  },
];

function LabEquipmentTable() {
  return (
    <TableContainer component={Paper} sx={{ mt: "20px" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Step Number</TableCell>
            <TableCell>Method Name</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Volume Handled</TableCell>
            <TableCell>Comments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.step}>
              <TableCell component="th" scope="row">
                {row.step}
              </TableCell>
              <TableCell>{row.method}</TableCell>
              <TableCell>{row.startTime}</TableCell>
              <TableCell>{row.endTime}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.volume}</TableCell>
              <TableCell>{row.comments}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LabEquipmentTable;
