import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import axios from "../../utils/axios";

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

export default function NotifyDetail(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({});

  useEffect(() => {
    if (props.id) {
      setLoading(true);
      axios
        .post("notify/detail", {
          id: props.id
        })
        .then(res => {
          setNotify({
            ...res.data.notify,
            detail: res.data.detail
          });
          console.log(res.data);
        })
        .catch()
        .finally(() => setLoading(false));
    }
  }, [props.id]);

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
}
