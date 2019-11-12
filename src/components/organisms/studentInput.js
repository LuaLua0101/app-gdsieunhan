import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Done";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useFormInput from "../../utils/useFormNumber";
import { useSnackbar } from "notistack";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  margin: {
    margin: "auto"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  close: {
    padding: theme.spacing(0.5)
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%"
  }
}));

const formatMoney = money => {
  return money
    ? money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    : "";
};

const StudentInput = props => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [note, setNote] = useState([]);
  const fee = useFormInput("");
  const [value, setValue] = useState("female");
  const [date, setDate] = useState(0);

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleClickVariant = variant => () => {
    enqueueSnackbar("Xác nhận chi thành công!", { variant });
  };

  return (
    <>
      <form className={classes.container} noValidate autoComplete="off">
        <RadioGroup name="gender1" value={value} onChange={handleChange} row>
          <FormControlLabel
            labelPlacement="start"
            label="Nam"
            value="female"
            control={<Radio />}
          />
          <FormControlLabel
            labelPlacement="start"
            label="Nữ"
            value="male"
            control={<Radio />}
          />
        </RadioGroup>
        <TextField
          label="Họ tên học sinh"
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        <TextField
          label="Địa chỉ"
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        <TextField
          label="Số điện thoại liên hệ"
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Ngày sinh"
            format="dd/MM/yyyy"
            value={selectedDate}
            className={classes.textField}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
        <Autocomplete
          freeSolo
          className={classes.textField}
          options={note}
          {...fee}
          renderInput={params => (
            <TextField
              {...params}
              label="Học phí"
              margin="normal"
              variant="outlined"
              fullWidth
              onChange={e => {
                const value = parseInt(e.target.value.replace(/,/g, ""));
                fee.setValue(formatMoney(value));
              }}
            />
          )}
        />
        <TextField
          label="Ghi chú"
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          className={classes.margin}
          style={{
            backgroundColor: "#44cbdf",
            backgroundImage:
              "linear-gradient(141deg,  #44cbdf 15%, #01ca7c 85%)",
            color: "#fbfefe",
            boxShadow: "none"
          }}
          onClick={handleClickVariant(props.in ? "success" : "warning")}
        >
          <NavigationIcon className={classes.extendedIcon} />
          Xác nhận thêm
        </Fab>
      </form>
    </>
  );
};

export default StudentInput;
