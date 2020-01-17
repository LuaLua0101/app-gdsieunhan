import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Fab from "@material-ui/core/Fab";
import useFormInput from "../../utils/useFormInput";
import axios from "../../utils/axios";
import { useSnackbar } from "notistack";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  card: {}
}));

export default function AboutUsPage(props) {
  const classes = useStyles();
  const feedback = useFormInput();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get("user/feedback")
      .then(res => {
        feedback.setValue(res.data.feedback);
      })
      .catch();
  }, []);

  const updateFeedback = () => {
    axios
      .post("user/update-feedback", {
        feedback: feedback.value
      })
      .then(res => {
        enqueueSnackbar("Cập nhật thành công", {
          variant: "success"
        });
      })
      .catch(e =>
        enqueueSnackbar("Lỗi cập nhật thông tin", {
          variant: "error"
        })
      );
  };

  return (
    <>
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <Card
            className={classes.card}
            onClick={() =>
              (window.location.href =
                "https://www.facebook.com/groups/1510577542373186/")
            }
          >
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={window.location.origin + "/langtre.jpg"}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lớp học Gia đình siêu nhân
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Địa chỉ: số 8 ngõ 328/34 Lê Trọng Tấn, Thanh Xuân, Hà Nội
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Card
            className={classes.card}
            onClick={() =>
              (window.location.href =
                "https://www.facebook.com/groups/1980827895577397/")
            }
          >
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={window.location.origin + "/langtre.jpg"}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Làng Trẻ
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>H</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<b>Cô Hà siêu nhân</b>}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  <b>034.965.0088</b>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>K</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Thầy Khoai"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  0977.261.994
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <TextField
            label="Feedback của phụ huynh"
            margin="normal"
            variant="outlined"
            style={{ width: "100%" }}
            className={classes.textField}
            multiline={true}
            rows={4}
            rowsMax={4}
            {...feedback}
          />
        </ListItem>
        <ListItem alignItems="flex-start">
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
            onClick={updateFeedback}
          >
            Gửi feedback
          </Fab>
        </ListItem>
      </List>
    </>
  );
}
