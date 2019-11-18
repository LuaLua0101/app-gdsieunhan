import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Done";
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
  KeyboardDatePicker
} from "@material-ui/pickers";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

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

const NotifyInput = props => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [notes, setNotes] = useState(["123"]);
  const fee = useFormInput("");
  const [date, setDate] = useState(0);
  const [state, setState] = React.useState({});

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleClickVariant = variant => () => {
    enqueueSnackbar("Xác nhận chi thành công!", { variant });
  };

  return (
    <>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          label="Tiêu đề thông báo"
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Ngày ra thông báo"
            format="dd/MM/yyyy"
            value={selectedDate}
            className={classes.textField}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {notes.map((i, index) => (
              <TextField
                label={"Nội dung mục thông báo số " + (index + 1)}
                margin="normal"
                variant="outlined"
                className={classes.textField}
                multiline={true}
                rows={2}
                rowsMax={4}
                value={i}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              onClick={() => {
                setNotes([...notes, ""]);
              }}
            >
              <AddCircleOutlineIcon className={classes.extendedIcon} />
              Thêm dòng
            </Fab>
          </Grid>
          <Grid item xs={12}>
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
              Xác nhận thêm thông báo
            </Fab>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default NotifyInput;
