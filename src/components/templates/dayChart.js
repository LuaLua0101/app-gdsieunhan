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

const History = DynamicImport(() => import("../templates/multiDateHistory"));
export default function DayChart() {
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
    </MuiPickersUtilsProvider>
  );
}
