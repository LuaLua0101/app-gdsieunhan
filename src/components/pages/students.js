import React from "react";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import DynamicImport from "../../utils/lazyImport";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const StudentInput = DynamicImport(() => import("../organisms/studentInput"));
const StudentList = DynamicImport(() => import("../organisms/studentList"));

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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const StudentsPage = () => {
  const classes = useStyles();

  return (
    <Paper square>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Thêm học sinh mới</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <StudentInput />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Typography gutterBottom>Danh sách học sinh</Typography>
      <StudentList />
    </Paper>
  );
};

export default StudentsPage;
