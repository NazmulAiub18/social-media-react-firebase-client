import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
// Redux stuff
import { useDispatch, useSelector } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";

import { useForm } from "../../util/hooks";

const styles = (theme) => ({
  ...theme.main,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
});

const PostScream = (props) => {
  const { classes } = props;
  const { loading, errors } = useSelector((state) => state.UI);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const initialState = {
    body: "",
  };

  const { onChange, onSubmit, values } = useForm(
    submitPostCallback,
    initialState
  );

  function submitPostCallback() {
    setOpen(false);
    dispatch(postScream(values));
  }

  //TODO: if no errors not loading then empty body open: false clear errors

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    dispatch(clearErrors());
    setOpen(false);
  };
  return (
    <>
      <MyButton onClick={handleOpen} tip="Post a Scream!">
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!!"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              value={values.body}
              error={errors && errors.body ? true : false}
              helperText={errors && errors.body}
              className={classes.textField}
              onChange={onChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

PostScream.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostScream);
