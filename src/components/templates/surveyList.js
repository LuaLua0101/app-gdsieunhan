import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DynamicImport from "../../utils/lazyImport";
import Drawer from "@material-ui/core/Drawer";
import axios from "../../utils/axios";
import { useSnackbar } from "notistack";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Done";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const SurveySkillList = DynamicImport(() =>
  import("../organisms/surveySkillList")
);
const useStyles = makeStyles(theme => ({
  rootPaper: {
    padding: theme.spacing(3, 2),
    width: "100%",
    backgroundColor: "#44cbdf",
    backgroundImage: "linear-gradient(141deg,  #44cbdf 15%, #01ca7c 85%)",
    color: "#fbfefe",
    borderRadius: 0,
    boxShadow: "none"
  },
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
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
  },
  rating1: {
    display: "flex",
    alignItems: "center"
  }
}));

const labels = {
  0: "Không đạt",
  1: "Sắp đạt",
  2: "Gần đạt",
  3: "Đạt yêu cầu",
  4: "Làm khá tốt",
  5: "Làm rất tốt"
};

const SurveyList = props => {
  const classes = useStyles();
  const [skillGroups, setSkillGroups] = useState();
  const [survey, setSurvey] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hover, setHover] = useState(-1);
  const [count, setCount] = useState([]);

  useEffect(() => {
    axios
      .get("skill-group/list")
      .then(res => {
        setSkillGroups(res.data);
      })
      .catch(err =>
        enqueueSnackbar(err.message, {
          variant: "error"
        })
      );

    axios
      .get("skill/check-survey")
      .then(res => {
        setSurvey(res.data.data.id);
      })
      .catch();
  }, []);

  const setCloseDetail = () => {
    setOpenDetail(false);
  };

  const setOpenDetailDrawer = (skill, index) => {
    setSelectedSkill({
      skill,
      index
    });
    setOpenDetail(true);
  };

  return (
    <>
      {skillGroups &&
        skillGroups.map((item, index) => (
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{item.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SurveySkillList
                group={item.id}
                survey={survey}
                open={setOpenDetailDrawer}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      {selectedSkill && (
        <Drawer anchor="bottom" open={openDetail} onClose={setCloseDetail}>
          <form className={classes.container} noValidate autoComplete="off">
            <Paper className={classes.rootPaper}>
              <Typography variant="h5" component="h3">
                Câu hỏi số {selectedSkill.index}
              </Typography>
              <Typography component="p">
                {selectedSkill.skill.content}
              </Typography>
            </Paper>
            <Box
              component="fieldset"
              mb={1}
              borderColor="transparent"
              style={{
                marginTop: 20
              }}
            >
              <Typography component="legend">Đánh giá theo điểm</Typography>
              <div className={classes.rating1}>
                <Rating
                  value={selectedSkill.skill.rate}
                  onChange={(event, value) => {
                    setSelectedSkill({
                      index: selectedSkill.index,
                      skill: {
                        ...selectedSkill.skill,
                        rate: value
                      }
                    });
                  }}
                />
                <Box ml={2}>
                  {labels[hover !== -1 ? hover : selectedSkill.skill.rate]}
                </Box>
              </div>
            </Box>
            <TextField
              label="Đánh giá của cô"
              margin="normal"
              variant="outlined"
              className={classes.textField}
              rows="2"
              multiline
              value={selectedSkill.skill.note}
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
              OK
            </Fab>
          </form>
        </Drawer>
      )}
    </>
  );
};

export default SurveyList;
