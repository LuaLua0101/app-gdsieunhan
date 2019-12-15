import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "../../utils/axios";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

export default function SurveySkillList(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .post("skill/list-survey", {
        group: props.group
      })
      .then(res => {
        setData(res.data.data);
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  return (
    <Table className={classes.table} aria-label="simple table">
      <TableHead
        style={{
          backgroundColor: "#44cbdf",
          backgroundImage: "linear-gradient(141deg,  #44cbdf 15%, #01ca7c 85%)",
          color: "#fbfefe",
          boxShadow: "none",
          borderRadius: 0
        }}
      >
        <TableRow>
          <TableCell>STT</TableCell>
          <TableCell>Nội dung</TableCell>
          <TableCell>Điểm đánh giá</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data &&
          data.map((item, index) => (
            <TableRow
              style={{ cursor: "pointer" }}
              onClick={() => props.open(item, index + 1)}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.content}</TableCell>
              <TableCell>
                {item.rate ? item.rate : 0}
                {/* <Rating
                  name="size-small"
                  value={item.rate ? item.rate : 0}
                  size="small"
                /> */}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
