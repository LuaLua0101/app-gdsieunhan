import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import DynamicImport from "../../utils/lazyImport";

const StudentInput = DynamicImport(() => import("../templates/studentInput"));
const HistoryOfObservation = DynamicImport(() =>
  import("../templates/historyOfObservation")
);

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

export default function StudentDetail() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <>
      <Tabs
        variant="fullWidth"
        value={value}
        indicatorColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Thông tin" />
        <Tab label="Khảo sát" />
        <Tab label="Kế hoạch" />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0}>
          <StudentInput update />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Thông tin khảo sát
        </TabPanel>
        <TabPanel value={value} index={2}>
          Kế hoạch đào tạo
        </TabPanel>
      </SwipeableViews>
    </>
  );
}
