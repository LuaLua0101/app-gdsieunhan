import React, { useState, useEffect } from "react";
import { Link as ReactLink, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import GroupIcon from "@material-ui/icons/Group";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PersonIcon from "@material-ui/icons/Person";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import FaceIcon from "@material-ui/icons/Face";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  rootPC: {
    flexGrow: 1,
    width: 500,
    marginLeft: "auto",
    marginRight: "auto"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 300
  },
  fullList: {
    width: "auto"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const Menu = props => {
  const classes = useStyles();
  const [menu, setMenu] = React.useState({
    finance: false,
    notify: false,
    student: false,
    teacher: false,
    parent: false
  });

  const handleClick = seq => {
    if (seq === 1)
      setMenu({
        ...menu,
        finance: !menu.finance
      });
    else if (seq === 2)
      setMenu({
        ...menu,
        notify: !menu.notify
      });
    else if (seq === 3)
      setMenu({
        ...menu,
        student: !menu.student
      });
    else if (seq === 4)
      setMenu({
        ...menu,
        teacher: !menu.teacher
      });
    else if (seq === 5)
      setMenu({
        ...menu,
        parent: !menu.parent
      });
  };

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMenu(false);
  };

  return (
    <div
      className={classes.list}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
      style={{
        height: "100%",
        backgroundColor: "#44cbdf",
        backgroundImage: "linear-gradient(141deg,  #44cbdf 55%, #01ca7c 85%)",
        color: "#fbfefe"
      }}
    >
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItem button onClick={() => handleClick(1)}>
          <ListItemIcon>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý tài chính" />
          {menu.finance ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={menu.finance} timeout="auto">
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText
                primary="Thêm giao dịch"
                onClick={() => {
                  props.close();
                  props.history.push("/");
                }}
              />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText
                primary="Giao dịch cố định"
                onClick={() => {
                  props.close();
                  props.history.push("/scheduled");
                }}
              />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ShowChartIcon />
              </ListItemIcon>
              <ListItemText
                primary="Thống kê thu chi"
                onClick={() => {
                  props.close();
                  props.history.push("/chart");
                }}
              />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <ListItem button onClick={() => handleClick(2)}>
          <ListItemIcon>
            <NotificationsActiveIcon />
          </ListItemIcon>
          <ListItemText primary="Thông báo" />
          {menu.notify ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={menu.notify} timeout="auto">
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Thông báo phụ huynh"
                onClick={() => {
                  props.close();
                  props.history.push("/notify");
                }}
              />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <NotificationsNoneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Thông báo giáo viên"
                onClick={() => {
                  props.close();
                  props.history.push("/notify");
                }}
              />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText
                primary="Quản lý thông báo"
                onClick={() => {
                  props.close();
                  props.history.push("/add-notify");
                }}
              />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <ListItem button onClick={() => handleClick(3)}>
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý trẻ" />
          {menu.student ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={menu.student} timeout="auto">
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <PlaylistAddCheckIcon />
              </ListItemIcon>
              <ListItemText
                primary="Sổ theo dõi trẻ"
                onClick={() => {
                  props.close();
                  props.history.push("/add-report");
                }}
              />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText
                primary="Danh sách trẻ"
                onClick={() => {
                  props.close();
                  props.history.push("/students");
                }}
              />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <ListItem button onClick={() => handleClick(4)}>
          <ListItemIcon>
            <PersonOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý giáo viên" />
          {menu.teacher ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={menu.teacher} timeout="auto">
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText
                primary="Danh sách giáo viên"
                onClick={() => {
                  props.close();
                  props.history.push("/students");
                }}
              />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <ListItem button onClick={() => handleClick(5)}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý phụ huynh" />
          {menu.parent ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={menu.parent} timeout="auto">
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText
                primary="Danh sách phụ huynh"
                onClick={() => {
                  props.close();
                  props.history.push("/students");
                }}
              />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText
            primary="Đăng xuất"
            onClick={() => {
              localStorage.removeItem("@token");
              window.location.replace("/login");
            }}
          />
        </ListItem>
      </List>
    </div>
  );
};

export default withRouter(Menu);