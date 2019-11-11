import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Done";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useFormInput from "../../utils/useFormNumber";
import { useSnackbar } from "notistack";

const notes = ["Đi chợ", "Mua linh tinh", "Lý do khác"];

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
  }
}));

const moneyArr = [
  { number: 20000, label: "20k", color: "#359aca" },
  { number: 50000, label: "50k", color: "#54afcd" },
  { number: 100000, label: "100k", color: "#72c4d0" },
  { number: 200000, label: "200k", color: "#91d9d3" },
  { number: 500000, label: "500k", color: "#01ca7c" }
];

const formatMoney = money => {
  return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const MoneyInput = props => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [note, setNote] = useState([]);
  const fee = useFormInput("");

  const handleClickVariant = variant => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(
      props.in ? "Xác nhận thu thành công!" : "Xác nhận chi thành công!",
      { variant }
    );
  };

  return (
    <>
      <form className={classes.container} noValidate autoComplete="off">
        <Autocomplete
          freeSolo
          className={classes.textField}
          options={note}
          {...fee}
          renderInput={params => (
            <TextField
              {...params}
              label="Số tiền"
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
        <Autocomplete
          freeSolo
          className={classes.textField}
          options={notes.map(option => option)}
          renderInput={params => (
            <TextField
              {...params}
              label="Ghi chú"
              margin="normal"
              variant="outlined"
              fullWidth
            />
          )}
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
          {props.in ? "Xác nhận thu" : "Xác nhận chi"}
        </Fab>
      </form>
      {/* {moneyArr.map(i => (
        <Chip
          style={{ margin: 5, backgroundColor: i.color, color: "#fbfefe" }}
          label={i.label}
          size="small"
        />
      ))} */}
    </>
  );
};

export default MoneyInput;
