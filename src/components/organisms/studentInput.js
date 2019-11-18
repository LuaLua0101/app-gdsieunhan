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
  const [state, setState] = React.useState({});

  const handleSelect = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  const [selectedDate, setSelectedDate] = React.useState(new Date());

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
          label="Biệt danh học sinh"
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        <TextField
          label="Họ tên mẹ"
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        <TextField
          label="Số điện thoại Mẹ"
          margin="normal"
          type="number"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">(+84) </InputAdornment>
            )
          }}
          className={classes.textField}
        />
        <TextField
          label="Họ tên bố"
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        <TextField
          label="Số điện thoại Bố"
          margin="normal"
          type="number"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">(+84) </InputAdornment>
            )
          }}
          className={classes.textField}
        />
        <TextField
          label="Địa chỉ liên hệ"
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        <TextField
          label="Facebook cá nhân"
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">VNĐ</InputAdornment>
                )
              }}
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
        <div className={classes.textField}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Tính cách của trẻ</FormLabel>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedA}
                    onChange={handleSelect("checkedA")}
                    value="checkedA"
                  />
                }
                label="Trầm lặng"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedB}
                    onChange={handleSelect("checkedB")}
                    value="checkedB"
                  />
                }
                label="Kiên nhẫn"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedC}
                    onChange={handleSelect("checkedC")}
                    value="checkedC"
                  />
                }
                label="Dễ nản chí"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedD}
                    onChange={handleSelect("checkedD")}
                    value="checkedD"
                  />
                }
                label="Lăng xăng"
              />
              <FormControlLabel
                control={
                  <TextField
                    label="Khác (nếu có)"
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                  />
                }
              />
            </FormGroup>
          </FormControl>
        </div>
        <div className={classes.textField}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Trẻ đi học</FormLabel>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedA}
                    onChange={handleSelect("checkedA")}
                    value="checkedA"
                  />
                }
                label="Nhà trẻ"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedB}
                    onChange={handleSelect("checkedB")}
                    value="checkedB"
                  />
                }
                label="Tiểu học"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedC}
                    onChange={handleSelect("checkedC")}
                    value="checkedC"
                  />
                }
                label="Trung tâm chuyên biệt"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedD}
                    onChange={handleSelect("checkedD")}
                    value="checkedD"
                  />
                }
                label="Ở nhà"
              />
              <FormControlLabel
                control={
                  <TextField
                    style={{ size: 15 }}
                    label="Khác (nếu có)"
                    margin="normal"
                    variant="outlined"
                  />
                }
              />
            </FormGroup>
          </FormControl>
        </div>
        <TextField
          label="Ba mẹ chia sẻ tình trạng cụ thể của con và những điểm lưu ý mà ba mẹ lo lắng?"
          margin="normal"
          variant="outlined"
          className={classes.textField}
          multiline={true}
          rows={2}
          rowsMax={4}
        />
        <TextField
          label="Ba mẹ hãy chia sẻ những việc con làm được? Chưa làm được? Mong muốn của ba mẹ?"
          margin="normal"
          variant="outlined"
          className={classes.textField}
          multiline={true}
          rows={2}
          rowsMax={4}
        />
        <TextField
          label="Ba mẹ có yêu cầu, mong muốn đăng ký học khung giờ nào trong ngày?"
          margin="normal"
          variant="outlined"
          className={classes.textField}
          multiline={true}
          rows={2}
          rowsMax={4}
        />
        <TextField
          label="Ghi chú thêm của cô"
          margin="normal"
          variant="outlined"
          className={classes.textField}
          multiline={true}
          rows={2}
          rowsMax={4}
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
          {props.update ? "Xác nhận sửa" : "Xác nhận thêm"}
        </Fab>
      </form>
    </>
  );
};

export default StudentInput;
