import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Done";
import useFormInput from "../../utils/useFormInput";
import { useSnackbar } from "notistack";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "../../utils/axios";
import { dispatch } from "../../Store";
import { withRouter } from "react-router";
import Select from "@material-ui/core/Select";
import useFormDropdown from "../../utils/useFormDropdown";

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

const SkillTypeInput = props => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const name = useFormInput();
  const [ID, setID] = useState(null);
  const [loading, setLoading] = useState(false);
  const group = useFormDropdown();
  const [skillGroups, setSkillGroups] = useState();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    if (props.update) {
      setLoading(true);
      axios
        .post("skill-type/detail", { id: parseInt(props.match.params.id) })
        .then(res => {
          const { skill } = res.data;
          console.log(res.data);
          setID(skill.id);
          name.setValue(skill.name);
          group.setValue(skill.group_type);
        })
        .catch(err =>
          enqueueSnackbar(err.message, {
            variant: "error"
          })
        )
        .finally(() => setLoading(false));
    }
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
  }, []);

  const clear = () => {
    name.setValue("");
  };

  const addSkillType = () => {
    setLoading(true);
    axios
      .post(props.update ? "skill-type/update" : "skill-type/add", {
        id: props.update ? ID : null,
        name: name.value,
        type: group.value
      })
      .then(res => {
        if (!props.update) {
          dispatch({
            type: "add_skill_types",
            skill_types: [
              {
                id: res.data.id,
                name: name.value,
                group_type_id: group.value,
                gname: skillGroups.find(element => {
                  return element.id == group.value;
                }).name
              }
            ]
          });
          clear();
        }
        enqueueSnackbar(
          props.update
            ? "Xác nhận cập nhật thành công!"
            : "Xác nhận thêm thành công!",
          { variant: "success" }
        );
        props.update && props.history.push("/skill-types");
      })
      .catch(err =>
        enqueueSnackbar(err.message, {
          variant: "error"
        })
      )
      .finally(() => setLoading(false));
  };

  return (
    <>
      <form className={classes.container} noValidate autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Chọn mặt phát triển
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            {...group}
            labelWidth={labelWidth}
          >
            {skillGroups &&
              skillGroups.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name} {item.type === 1 ? " - Kế hoạch" : " - Khảo sát"}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          label="Nhóm kỹ năng"
          margin="normal"
          variant="outlined"
          className={classes.textField}
          {...name}
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
          onClick={addSkillType}
        >
          <NavigationIcon className={classes.extendedIcon} />
          {props.update ? "Sửa nhóm kỹ năng" : "Thêm nhóm kỹ năng"}
        </Fab>
      </form>
    </>
  );
};

export default withRouter(SkillTypeInput);
