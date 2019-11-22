import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { dispatch, useGlobalState } from "../../Store";
import axios from "../../utils/axios";
import moment from "moment";
import { useSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "scroll"
  }
});

export default function NotifyList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [notifies] = useGlobalState("notifies");
  const [loading, setLoading] = useState(false);
  const [delID, setDelID] = useState();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
    axios
      .get("notify/list")
      .then(res => {
        dispatch({
          type: "add_notifies",
          notify: res.data
        });
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const remove = id => {
    setDelID(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    axios
      .post("notify/delete", {
        id: delID
      })
      .then(res => {
        if (res.data === 200) {
          dispatch({
            type: "del_notify",
            id: delID
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

  const renderType = type => {
    return (
      <Chip
        label={type === 0 ? "GV" : "PH"}
        size="small"
        color={type === 0 ? "primary" : "secondary"}
      />
    );
  };

  return (
    <>
      <Table className={classes.table} aria-label="simple table">
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
            <TableCell>Tiêu đề</TableCell>
            <TableCell>Loại</TableCell>
            <TableCell>Ngày lên lịch</TableCell>
            <TableCell>Ghim</TableCell>
            <TableCell>Xóa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notifies.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.title && row.title.substring(0, 10)}</TableCell>
              <TableCell>{renderType(row.type)}</TableCell>
              <TableCell>
                {moment(row.active_date).format("DD/MM/YY")}
              </TableCell>
              <TableCell>
                {row.pin === 1 && (
                  <BookmarkIcon
                    style={{
                      color: "#01ca7c",
                      cursor: "pointer",
                      fontSize: 30
                    }}
                    onClick={handleClickOpen}
                  />
                )}
              </TableCell>
              <TableCell>
                <DeleteIcon
                  style={{
                    color: "black",
                    cursor: "pointer",
                    fontSize: 30
                  }}
                  onClick={() => remove(row.id)}
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
            Hủy, không xóa
          </Button>
          <Button onClick={handleOk} color="primary">
            Xóa luôn
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
