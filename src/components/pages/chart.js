import React from "react";
import Chart from "react-google-charts";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const ChartPage = props => {
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
      >
        {mon ? "Tháng " + mon : "Chọn tháng cần xem báo cáo"}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {months.map(i => (
          <MenuItem
            onClick={() => {
              setMon(i);
              handleClose();
            }}
          >
            Tháng {i}
          </MenuItem>
        ))}
      </Menu>
      <br />
      <EqualizerIcon style={{ color: "blue" }} /> Tiền thu
      <EqualizerIcon style={{ color: "red" }} /> Tiền chi
      {mon && (
        <>
          <Chart
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["1/20", "Thu", "Chi"],
              ["1/10", 175000, 1008000],
              ["2/10", 175000, 1008000],
              ["3/10", 175000, 1008000],
              ["4/10", 175000, 1008000],
              ["5/10", 175000, 1008000],
              ["6/10", 175000, 1008000],
              ["7/10", 175000, 1008000]
            ]}
            options={{
              title: "Thống kê tháng " + mon,
              hAxis: {
                title: "Số tiền",
                minValue: 0
              },
              vAxis: {
                title: "City"
              },
              height: 500,
              bar: { groupWidth: "100%" },
              legend: { position: "none" }
            }}
            rootProps={{ "data-testid": "1" }}
          />
          <Paper
            className={classes.root}
            style={{
              backgroundColor: "#44cbdf",
              backgroundImage:
                "linear-gradient(141deg,  #44cbdf 15%, #01ca7c 85%)",
              color: "#fbfefe",
              boxShadow: "none"
            }}
          >
            <Typography variant="h5" component="h3">
              Tổng thu nhập tháng {mon}
            </Typography>
            <Typography component="p">100,000,000 vnđ</Typography>
          </Paper>
          <br />
          <Paper
            className={classes.root}
            style={{
              backgroundColor: "#fbfefe",
              backgroundImage:
                "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
              color: "#fbfefe",
              boxShadow: "none"
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

export default ChartPage;
