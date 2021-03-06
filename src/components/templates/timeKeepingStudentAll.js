import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import { withRouter } from "react-router";
import axios from "../../utils/axios";
import { dispatch, useGlobalState } from "../../Store";
import { useSnackbar } from "notistack";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import MenuBookIcon from "@material-ui/icons/MenuBook";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TimeKeepingStudentAll = props => {
  const [open, setOpen] = useState(false);
  const [openHealth, setOpenHealth] = useState(false);
  const [openEx, setOpenEx] = useState(false);
  const [tID, setTID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timekeeping] = useGlobalState("timekeeping");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .post("student/time-keeping-all")
      .then(res => {
        console.log(res.data);
        dispatch({
          type: "init_timekeeping",
          timekeeping: res.data.list
        });
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  const edit = (id, checkin, checkout) => {
    setTID({
      id,
      checkin,
      checkout
    });
    setOpen(true);
  };

  const editHealth = (id, checkin, checkout, health_check) => {
    setTID({
      id,
      checkin,
      checkout,
      health_check
    });
    setOpenHealth(true);
  };

  const editEx = (id, checkin, checkout, exercise) => {
    setTID({
      id,
      checkin,
      checkout,
      exercise
    });
    setOpenEx(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseHealth = () => {
    setOpenHealth(false);
  };

  const handleCloseEx = () => {
    setOpenEx(false);
  };

  const addCheckin = id => {
    axios
      .post("student/add-checkin", {
        id
      })
      .then(res => {
        dispatch({
          type: "add_timekeeping",
          id,
          checkin: {
            tid: res.data.checkin.id,
            ...res.data.checkin
          }
        });
        enqueueSnackbar("Xác nhận đã điểm danh", { variant: "success" });
      })
      .catch(err =>
        enqueueSnackbar(err.message, {
          variant: "error"
        })
      )
      .finally(() => setOpen(false));
  };

  const removeCheckin = (id, tid) => {
    axios
      .post("student/remove-checkin", {
        id: tid
      })
      .then(res => {
        if (res.data === 200) {
          dispatch({
            type: "del_timekeeping",
            id
          });
          enqueueSnackbar("Xác nhận đã xóa", { variant: "success" });
        }
      })
      .catch(err =>
        enqueueSnackbar(err.message, {
          variant: "error"
        })
      )
      .finally(() => setOpen(false));
  };

  const handleOk = () => {
    axios
      .post("student/update-checkin", {
        id: tID.id,
        checkin: tID.checkin,
        checkout: tID.checkout
      })
      .then(res => {
        dispatch({
          type: "edit_timekeeping",
          id: tID.id,
          checkin: tID.checkin,
          checkout: tID.checkout
        });
        enqueueSnackbar("Xác nhận thay đổi", { variant: "success" });
      })
      .catch(err =>
        enqueueSnackbar(err.message, {
          variant: "error"
        })
      )
      .finally(() => setOpen(false));
  };

  const handleOkHealth = () => {
    axios
      .post("student/update-health", {
        id: tID.id,
        health_check: tID.health_check
      })
      .then(res => {
        dispatch({
          type: "edit_timekeeping",
          id: tID.id,
          ...tID
        });
        setOpenHealth(false);
        enqueueSnackbar("Xác nhận thay đổi", { variant: "success" });
      })
      .catch(err =>
        enqueueSnackbar(err.message, {
          variant: "error"
        })
      )
      .finally(() => setOpen(false));
  };

  const handleOkEx = () => {
    axios
      .post("student/update-exercise", {
        id: tID.id,
        exercise: tID.exercise
      })
      .then(res => {
        dispatch({
          type: "edit_timekeeping",
          id: tID.id,
          ...tID
        });
        setOpenEx(false);
        enqueueSnackbar("Xác nhận thay đổi", { variant: "success" });
      })
      .catch(err =>
        enqueueSnackbar(err.message, {
          variant: "error"
        })
      )
      .finally(() => setOpen(false));
  };

  return (
    <>
      <Table>
        <TableHead
          style={{
            backgroundColor: "#44cbdf",
            backgroundImage:
              "linear-gradient(141deg,  #44cbdf 15%, #01ca7c 85%)",
            color: "#fbfefe",
            boxShadow: "none",
            borderRadius: 0
          }}
        >
          <TableRow>
            <TableCell>Họ tên trẻ</TableCell>
            <TableCell>In/Out</TableCell>
            <TableCell>Điểm danh</TableCell>
            <TableCell>Điều chỉnh thời gian</TableCell>
            <TableCell>T.t sức khỏe</TableCell>
            <TableCell>B.tập</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timekeeping.map(row => (
            <TableRow key={row.id}>
              <TableCell
                onClick={() => props.history.push("/student/" + row.id)}
              >
                {row.name}
              </TableCell>
              <TableCell>
                {row.checkin ? (
                  <Chip
                    label={row.checkin.checkin + " - " + row.checkin.checkout}
                    size="small"
                    color="primary"
                  />
                ) : (
                  <Chip label="chưa điểm danh" size="small" color="secondary" />
                )}
              </TableCell>
              <TableCell>
                {row.checkin ? (
                  <EventBusyIcon
                    style={{
                      color: "red",
                      cursor: "pointer",
                      fontSize: 30
                    }}
                    onClick={() => removeCheckin(row.id, row.checkin.tid)}
                  />
                ) : (
                  <EventAvailableIcon
                    style={{
                      color: "#3fb488",
                      cursor: "pointer",
                      fontSize: 30
                    }}
                    onClick={() => addCheckin(row.id)}
                  />
                )}
              </TableCell>
              <TableCell>
                {row.checkin && (
                  <PlaylistAddIcon
                    style={{
                      color: "#285083",
                      cursor: "pointer",
                      fontSize: 30
                    }}
                    onClick={() =>
                      edit(
                        row.checkin.tid,
                        row.checkin.checkin,
                        row.checkin.checkout
                      )
                    }
                  />
                )}
              </TableCell>
              <TableCell>
                {row.checkin && (
                  <LocalHospitalIcon
                    style={{
                      color: "red",
                      cursor: "pointer",
                      fontSize: 30
                    }}
                    onClick={() =>
                      editHealth(
                        row.checkin.tid,
                        row.checkin.checkin,
                        row.checkin.checkout,
                        row.checkin.health_check
                      )
                    }
                  />
                )}
              </TableCell>
              <TableCell>
                {row.checkin && (
                  <MenuBookIcon
                    style={{
                      color: "red",
                      cursor: "pointer",
                      fontSize: 30
                    }}
                    onClick={() =>
                      editEx(
                        row.checkin.tid,
                        row.checkin.checkin,
                        row.checkin.checkout,
                        row.checkin.exercise
                      )
                    }
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {tID && (
        <>
          {open && (
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                Thay đổi giờ checkin/checkout
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      label="Thời gian điểm danh"
                      margin="normal"
                      type="number"
                      variant="outlined"
                      value={tID.checkin.split(":")[0]}
                      onChange={e => {
                        const value = parseInt(e.target.value);
                        if (value >= 0 && value < 25) {
                          setTID({
                            ...tID,
                            checkin: value + ":" + tID.checkin.split(":")[1]
                          });
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Giờ </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      margin="normal"
                      type="number"
                      variant="outlined"
                      value={tID.checkin.split(":")[1]}
                      onChange={e => {
                        const value = parseInt(e.target.value);
                        if (value >= 0 && value < 60) {
                          setTID({
                            ...tID,
                            checkin: tID.checkin.split(":")[0] + ":" + value
                          });
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Phút </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      label="Thời gian về"
                      margin="normal"
                      type="number"
                      variant="outlined"
                      value={tID.checkout.split(":")[0]}
                      onChange={e => {
                        const value = parseInt(e.target.value);
                        if (value >= 0 && value < 25) {
                          setTID({
                            ...tID,
                            checkout: value + ":" + tID.checkout.split(":")[1]
                          });
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Giờ </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      margin="normal"
                      type="number"
                      variant="outlined"
                      value={tID.checkout.split(":")[1]}
                      onChange={e => {
                        const value = parseInt(e.target.value);
                        if (value >= 0 && value < 60) {
                          setTID({
                            ...tID,
                            checkout: tID.checkout.split(":")[0] + ":" + value
                          });
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Phút </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Hủy
                </Button>
                <Button onClick={handleOk} color="primary">
                  Thay đổi
                </Button>
              </DialogActions>
            </Dialog>
          )}

          {openHealth && (
            <Dialog
              fullWidth
              open={openHealth}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseHealth}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                Tình trạng sức khỏe
              </DialogTitle>
              <DialogContent>
                <TextField
                  label="Tình trạng sức khỏe"
                  margin="normal"
                  variant="outlined"
                  style={{ width: "100%" }}
                  multiline={true}
                  rows={4}
                  rowsMax={4}
                  value={tID.health_check}
                  onChange={e => {
                    const value = e.target.value;
                    setTID({
                      ...tID,
                      health_check: value
                    });
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseHealth} color="primary">
                  Hủy
                </Button>
                <Button onClick={handleOkHealth} color="primary">
                  Cập nhật
                </Button>
              </DialogActions>
            </Dialog>
          )}

          {openEx && (
            <Dialog
              fullWidth
              open={openEx}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseEx}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                Bài tập về nhà
              </DialogTitle>
              <DialogContent>
                <TextField
                  label="Bài tập về nhà"
                  margin="normal"
                  variant="outlined"
                  style={{ width: "100%" }}
                  multiline={true}
                  rows={4}
                  rowsMax={4}
                  value={tID.exercise}
                  onChange={e => {
                    const value = e.target.value;
                    setTID({
                      ...tID,
                      exercise: value
                    });
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEx} color="primary">
                  Hủy
                </Button>
                <Button onClick={handleOkEx} color="primary">
                  Cập nhật
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </>
      )}
    </>
  );
};

export default withRouter(TimeKeepingStudentAll);
