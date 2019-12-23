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
import Grid from "@material-ui/core/Grid";
import { SnackbarProvider } from "notistack";
import { withGetScreen } from "react-getscreen";
import DynamicImport from "./utils/lazyImport";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import Badge from "@material-ui/core/Badge";
import axios from "./utils/axios";
import styled from "styled-components";

const CustomBadge = styled.div`
  animation: shake 0.5s;
  animation-iteration-count: infinite;
  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
`;

const LoginPage = DynamicImport(() => import("./components/pages/login"));
const BirthdayList = DynamicImport(() =>
  import("./components/organisms/birthdayList")
);
const Menu = DynamicImport(() => import("./Menu"));

const useStyles = makeStyles(theme => ({
  root: {},
  rootPC: {
    width: 500,
    marginLeft: "auto",
    marginRight: "auto"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Segoe UI"].join(",")
  }
});

const App = props => {
  const classes = useStyles();
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState();

  useEffect(() => {
    axios
      .get("student/get-birthday")
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <GlobalStateProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
          <Router>
            {localStorage.getItem("@token") ? (
              <div
                className={
                  props.isMobile() || props.isTablet()
                    ? classes.root
                    : classes.rootPC
                }
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
                    {data && data.length > 0 && (
                      <CustomBadge>
                        <Badge badgeContent={data.length} color="secondary">
                          <CardGiftcardIcon
                            style={{ fontSize: 32, cursor: "pointer" }}
                            onClick={handleClickOpen}
                          />
                        </Badge>
                      </CustomBadge>
                    )}
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
                  <Menu
                    close={() => {
                      setMenu(false);
                    }}
                  />
                </Drawer>
                <BirthdayList open={open} onClose={handleClose} data={data} />
              </div>
            ) : (
              <LoginPage />
            )}
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </GlobalStateProvider>
  );
};

export default withGetScreen(App);
