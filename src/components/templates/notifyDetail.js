import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import axios from "../../utils/axios";
import { withRouter } from "react-router";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: "#fbfefe",
    backgroundImage:
      "linear-gradient(to right, #fff792 30%, #fef37f 52%,#ffef6d 100%)"
  },
  inline: {
    display: "inline"
  }
}));

const NotifyDetail = props => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({});

  useEffect(() => {
    if (props.type) {
      setLoading(true);
      const url =
        props.type === "gv"
          ? "notify/teacher-list"
          : props.type === "ph"
          ? "notify/parent-list"
          : props.history.goBack();
      axios
        .get(url)
        .then(res => {
          if (res.data.data && res.data.data.length === 0)
            props.history.goBack();
          const data = res.data.data[0];
          console.log(data);
          setNotify({
            ...data.notify,
            detail: data.detail
          });
        })
        .catch()
        .finally(() => setLoading(false));
    }
  }, [props.type]);

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={<>{notify.title}</>}
          secondary={
            <div style={{ fontSize: 16 }}>
              <Typography
                component="span"
                variant="h4"
                className={classes.inline}
                color="textPrimary"
              >
                {notify.active_date}
              </Typography>
              <br />
              <br />
              {notify.detail &&
                notify.detail.map(i => (
                  <>
                    {i.seq}. {i.content}
                    <br />
                    <br />
                  </>
                ))}
              <div style={{ textAlign: "center" }}>
                💐Thân mến và yêu thương💐 <br />
                Quản lí lớp học
                <br />
                Cô Hà siêu nhân
              </div>
            </div>
          }
        />
      </ListItem>
    </List>
  );
};
export default withRouter(NotifyDetail);
