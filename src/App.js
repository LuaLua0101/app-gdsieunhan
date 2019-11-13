import React, { useState, useEffect } from "react";
import { GlobalStateProvider } from "./Store";
import "./utils/firebase";
import RouteMap from "./Route";
import { BrowserRouter as Router, Link as ReactLink } from "react-router-dom";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { SnackbarProvider } from "notistack";
import { withGetScreen } from "react-getscreen";
import styled from "styled-components";

const Link = styled(ReactLink)`
  text-decoration: none;
  color: white;
  &:hover {
    color: black;
  }
`;

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
    width: 250
  },
  fullList: {
    width: "auto"
  }
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Avenir"].join(",")
  }
});

const App = props => {
  const classes = useStyles();
  const [menu, setMenu] = useState(false);

  

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setMenu(true);
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
      style={{
        height: "100%",
        backgroundColor: "#44cbdf",
        backgroundImage: "linear-gradient(141deg,  #44cbdf 55%, #01ca7c 85%)",
        color: "#fbfefe"
      }}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Link to="/">
            <ListItemText primary="Thêm giao dịch" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Link to="/scheduled">
            <ListItemText primary="Giao dịch cố định" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Link to="/chart">
            <ListItemText primary="Thống kê thu chi" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Link to="/students">
            <ListItemText primary="Danh sách học sinh" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Đăng xuất" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <GlobalStateProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
          <Router>
            <div
              className={classes.root}
            >
              <AppBar
                position="static"
                style={{
                  backgroundColor: "#44cbdf",
                  backgroundImage:
                    "linear-gradient(141deg,  #44cbdf 15%, #01ca7c 85%)",
                  color: "#fbfefe",
                  boxShadow: "none"
                }}
              >
                <Toolbar>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={() => {
                      setMenu(true);
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Quản lý lớp học
                  </Typography>
                  {/* <Button color="inherit">cô Hà hâm</Button> */}
                </Toolbar>
              </AppBar>
              <Grid item xs={12}>
                <RouteMap />
              </Grid>
              <Drawer
                open={menu}
                onClose={() => {
                  setMenu(false);
                }}
              >
                {sideList("left")}
              </Drawer>
            </div>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </GlobalStateProvider>
  );
};

export default withGetScreen(App);
