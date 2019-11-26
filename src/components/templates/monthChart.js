import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  LabelSeries
} from "react-vis";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MonthChart = props => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mon, setMon] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          width: "100%",
          borderRadius: 0,
          color: "#fbfefe",
          backgroundColor: "#44cbdf",
          backgroundImage: "linear-gradient(141deg,  #44cbdf 15%, #01ca7c 85%)"
        }}
      >
        {mon ? "Tháng " + mon : "Chọn tháng cần xem báo cáo"}
      </Button>
      <br />
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {months.map(i => (
          <MenuItem
          key={i}
            onClick={() => {
              setMon(i);
              handleClose();
            }}
          >
            Tháng {i}
          </MenuItem>
        ))}
      </StyledMenu>
      <br />
      <EqualizerIcon style={{ color: "#12939a" }} /> Tiền thu
      <EqualizerIcon style={{ color: "#79c7e3" }} /> Tiền chi
      {mon && (
        <>
          <div
            style={{
              overflow: "auto",
              marginBottom: 5
            }}
          >
            <XYPlot
              margin={{ bottom: 70 }}
              xType="ordinal"
              width={1200}
              height={500}
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis tickLabelAngle={-45} />
              <YAxis />
              <VerticalBarSeries
                data={[
                  { x: "1/10", y: 10 },
                  { x: "2/10", y: 5 },
                  { x: "3/10", y: 15 },
                  { x: "4/10", y: 10 },
                  { x: "5/10", y: 5 },
                  { x: "6/10", y: 15 },
                  { x: "7/10", y: 10 },
                  { x: "8/10", y: 5 },
                  { x: "9/10", y: 15 },
                  { x: "10/10", y: 10 },
                  { x: "11/10", y: 5 },
                  { x: "12/10", y: 15 },
                  { x: "13/10", y: 10 },
                  { x: "14/10", y: 5 },
                  { x: "15/10", y: 15 },
                  { x: "16/10", y: 10 },
                  { x: "17/10", y: 5 },
                  { x: "18/10", y: 15 },
                  { x: "19/10", y: 10 },
                  { x: "20/10", y: 5 },
                  { x: "21/10", y: 15 },
                  { x: "22/10", y: 10 },
                  { x: "23/10", y: 5 },
                  { x: "24/10", y: 15 },
                  { x: "25/10", y: 10 },
                  { x: "26/10", y: 5 },
                  { x: "27/10", y: 15 },
                  { x: "28/10", y: 10 },
                  { x: "29/10", y: 5 },
                  { x: "30/10", y: 15 }
                ]}
              />
              <VerticalBarSeries
                data={[
                  { x: "1/10", y: 10 },
                  { x: "2/10", y: 5 },
                  { x: "3/10", y: 15 },
                  { x: "4/10", y: 10 },
                  { x: "5/10", y: 5 },
                  { x: "6/10", y: 15 },
                  { x: "7/10", y: 10 },
                  { x: "8/10", y: 5 },
                  { x: "9/10", y: 15 },
                  { x: "10/10", y: 10 },
                  { x: "11/10", y: 5 },
                  { x: "12/10", y: 15 },
                  { x: "13/10", y: 10 },
                  { x: "14/10", y: 5 },
                  { x: "15/10", y: 15 },
                  { x: "16/10", y: 10 },
                  { x: "17/10", y: 5 },
                  { x: "18/10", y: 15 },
                  { x: "19/10", y: 10 },
                  { x: "20/10", y: 5 },
                  { x: "21/10", y: 15 },
                  { x: "22/10", y: 10 },
                  { x: "23/10", y: 5 },
                  { x: "24/10", y: 15 },
                  { x: "25/10", y: 10 },
                  { x: "26/10", y: 5 },
                  { x: "27/10", y: 15 },
                  { x: "28/10", y: 10 },
                  { x: "29/10", y: 5 },
                  { x: "30/10", y: 15 }
                ]}
              />
            </XYPlot>
          </div>
          <Paper
            className={classes.root}
            style={{
              backgroundColor: "#44cbdf",
              backgroundImage:
                "linear-gradient(141deg,  #44cbdf 15%, #01ca7c 85%)",
              color: "#fbfefe",
              boxShadow: "none",
              borderRadius: 0
            }}
          >
            <Typography variant="h5" component="h3">
              Tổng thu nhập tháng {mon}
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
              Tổng chi tiêu tháng {mon}
            </Typography>
            <Typography component="p">500,000,000 vnđ</Typography>
          </Paper>
        </>
      )}
    </>
  );
};

export default MonthChart;
