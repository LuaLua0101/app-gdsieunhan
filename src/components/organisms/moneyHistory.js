import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflow: "auto"
  }
});

export default function MoneyHistory() {
  const classes = useStyles();
  const [data, setData] = useState([
    { type: 0, total: "+100k", time: "1 giờ trước" },
    { type: 1, total: "-100k", time: "2 giờ trước" },
    { type: 1, total: "-100k", time: "10 giờ trước" },
    { type: 0, total: "+100k", time: "15 giờ trước" },
    { type: 0, total: "+100k", time: "1 giờ trước" },
    { type: 1, total: "-100k", time: "2 giờ trước" }
  ]);
  const renderType = type => {
    return (
      <Chip
        label={type === 0 ? "Thu" : "Chi"}
        size="small"
        color={type === 0 ? "primary" : "secondary"}
      />
    );
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead
          style={{
            backgroundColor: "#44cbdf",
            backgroundImage:
              "linear-gradient(141deg,  #44cbdf 15%, #01ca7c 85%)",
            color: "#fbfefe",
            boxShadow: "none"
          }}
        >
          <TableRow>
            <TableCell>Loại</TableCell>
            <TableCell>Số tiền</TableCell>
            <TableCell>Thời gian</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow>
              <TableCell>{renderType(row.type)}</TableCell>
              <TableCell>{row.total}</TableCell>
              <TableCell>{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
