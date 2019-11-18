import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = props => {
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Xác nhận xóa ?</DialogTitle>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Hủy, không xóa
        </Button>
        <Button onClick={props.handleClose} color="primary">
          Xóa luôn
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
