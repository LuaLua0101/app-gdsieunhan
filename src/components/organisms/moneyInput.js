import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Done";
import Chip from "@material-ui/core/Chip";

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
  }
}));

const moneyArr = [
  { number: 20000, label: "20k", color: "#359aca" },
  { number: 50000, label: "50k", color: "#54afcd" },
  { number: 100000, label: "100k", color: "#72c4d0" },
  { number: 200000, label: "200k", color: "#91d9d3" },
  { number: 500000, label: "500k", color: "#01ca7c" }
];

const MoneyInput = props => {
  const classes = useStyles();

  return (
    <>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label={props.in ? "Nhập số tiền đã thu" : "Nhập số tiền đã chi"}
          margin="normal"
          variant="outlined"
          type="number"
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
        >
          <NavigationIcon className={classes.extendedIcon} />
          {props.in ? "Xác nhận thu" : "Xác nhận chi"}
        </Fab>
      </form>
      {moneyArr.map(i => (
        <Chip
          style={{ margin: 5, backgroundColor: i.color, color: "#fbfefe" }}
          label={i.label}
          size="small"
        />
      ))}
    </>
  );
};

export default MoneyInput;
