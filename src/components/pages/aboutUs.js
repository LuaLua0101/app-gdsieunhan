import React from "react";
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
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

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
      </List>
    </>
  );
}
