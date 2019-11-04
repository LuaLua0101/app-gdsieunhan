import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import DynamicImport from "../../utils/lazyImport";
import Divider from "@material-ui/core/Divider";

const MoneyInput = DynamicImport(() => import("../organisms/moneyInput"));
const MoneyHistory = DynamicImport(() => import("../organisms/moneyHistory"));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default function MainFinancial() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <Paper square>
      <Tabs
        variant="fullWidth"
        value={value}
        indicatorColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Chi ( - )" />
        <Tab label="Thu ( + )" />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0}>
          <MoneyInput in={false} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MoneyInput in={true} />
        </TabPanel>
      </SwipeableViews>
      <Typography variant="h5" gutterBottom>
        Lịch sử thu chi hôm nay
      </Typography>
      <MoneyHistory />
    </Paper>
  );
}
