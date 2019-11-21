import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Done";
import { useSnackbar } from "notistack";
import DynamicImport from "../../utils/lazyImport";

const TypoGreenH5 = DynamicImport(() => import("../atoms/typoGreenH5"));
const TypoRedH5 = DynamicImport(() => import("../atoms/typoRedH5"));
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: "100%"
  },
  margin: {
    margin: "auto"
  }
}));

const Login = props => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.getItem("@token")) window.location.replace("/");
  }, []);

  const login = () => {
    localStorage.setItem("@token", 123);
    enqueueSnackbar("Xác nhận chi thành công!", { variant: "error" });
    window.location.replace("/");
  };

  return (
    <div
      style={{
        height: window.innerHeight,
        backgroundImage: `url(${window.location.origin + "/login.png"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >
      <TypoRedH5 text="Gia đình siêu nhân" />
      <TypoGreenH5 text="Đăng nhập" />

      <div style={{ padding: "50px 10px" }}>
        <TextField
          label="Số điện thoại"
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        <TextField
          label="Mật khẩu đăng nhập"
          margin="normal"
          variant="outlined"
          type="password"
          autoComplete="current-password"
          className={classes.textField}
        />
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          className={classes.margin}
          style={{
            display: "flex",
            backgroundColor: "#44cbdf",
            backgroundImage:
              "linear-gradient(141deg,  #44cbdf 15%, #01ca7c 85%)",
            color: "#fbfefe",
            boxShadow: "none"
          }}
          onClick={login}
        >
          <NavigationIcon className={classes.extendedIcon} />
          Đăng nhập
        </Fab>
      </div>
    </div>
  );
};

export default Login;
