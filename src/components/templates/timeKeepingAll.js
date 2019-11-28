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
import Slide from "@material-ui/core/Slide";
import { withRouter } from "react-router";
import axios from "../../utils/axios";
import { dispatch, useGlobalState } from "../../Store";
import moment from "moment";
import { useSnackbar } from "notistack";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TimeKeepingAll = props => {
  const [open, setOpen] = useState(false);
  const [delID, setDelID] = useState();
  const [loading, setLoading] = useState(false);
  const [timekeeping] = useGlobalState("timekeeping");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .post("teacher/time-keeping-all")
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

  const remove = id => {
    setDelID(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addCheckin = id => {
    axios
      .post("teacher/add-checkin", {
        id
      })
      .then(res => {
        if (res.data === 200) {
          dispatch({
            type: "add_timekeeping",
            id,
            checkin: { tid: 1, date: "2/2/2", checkin: "1:1", checkout: "2:2" }
          });
          enqueueSnackbar("Xác nhận đã chấm công", { variant: "success" });
        }
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
      .post("teacher/remove-checkin", {
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
      .post("user/delete", {
        id: delID
      })
      .then(res => {
        dispatch({
          type: "del_timekeeping",
          id: delID
        });
        enqueueSnackbar("Xác nhận đã xóa", { variant: "success" });
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
            <TableCell>Họ tên</TableCell>
            <TableCell>In/Out</TableCell>
            <TableCell>Chấm công</TableCell>
            <TableCell>Tăng ca</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timekeeping.map(row => (
            <TableRow key={row.id}>
              <TableCell
                onClick={() => props.history.push("/teacher/" + row.id)}
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
                  <Chip label="chưa chấm công" size="small" color="secondary" />
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
                <PlaylistAddIcon
                  style={{
                    color: "#285083",
                    cursor: "pointer",
                    fontSize: 30
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Xác nhận xóa ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Không xóa
          </Button>
          <Button onClick={handleOk} color="primary">
            Xóa luôn
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withRouter(TimeKeepingAll);
