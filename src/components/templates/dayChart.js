import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Fab from "@material-ui/core/Fab";
import DynamicImport from "../../utils/lazyImport";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

const History = DynamicImport(() => import("../templates/multiDateHistory"));
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

export default function DayChart() {
  const classes = useStyles();
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Ngày bắt đầu"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Ngày kết thúc"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </Grid>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        style={{
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#44cbdf",
          backgroundImage: "linear-gradient(141deg,  #44cbdf 15%, #01ca7c 85%)",
          color: "#fbfefe",
          boxShadow: "none"
        }}
      >
        <SearchIcon /> Xem lịch sử
      </Fab>
      <History />
      <Paper
        className={classes.root}
        style={{
          backgroundColor: "#44cbdf",
          backgroundImage: "linear-gradient(141deg,  #44cbdf 15%, #01ca7c 85%)",
          color: "#fbfefe",
          boxShadow: "none",
          borderRadius: 0
        }}
      >
        <Typography variant="h5" component="h3">
          Tổng thu nhập
        </Typography>
        <Typography component="p">100,000,000 vnđ</Typography>
      </Paper>
      <Paper
        className={classes.root}
        style={{
          backgroundColor: "#fbfefe",
          backgroundImage:
            "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
          color: "#fbfefe",
          boxShadow: "none",
          borderRadius: 0
        }}
      >
        <Typography variant="h5" component="h3">
          Tổng chi tiêu
        </Typography>
        <Typography component="p">500,000,000 vnđ</Typography>
      </Paper>
    </MuiPickersUtilsProvider>
  );
}
