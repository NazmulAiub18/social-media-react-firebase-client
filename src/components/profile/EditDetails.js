import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
// Redux stuff
import { useSelector, useDispatch } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Icons
import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
  ...theme.main,
  button: {
    float: "right",
  },
});

const EditDetails = (props) => {
  const { classes } = props;
  const credentials = useSelector((state) => state.user.credentials);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    bio: "",
    website: "",
    location: "",
  });
  const mapUserDetailsToState = (credentials) => {
    setState({
      ...state,
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };
  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, []);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {
    const userDetails = {
      bio: state.bio,
      website: state.website,
      location: state.location,
    };
    dispatch(editUserDetails(userDetails));
    handleClose();
  };
  return (
    <>
      <MyButton
        tip="Edit Details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              tpye="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={state.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              tpye="text"
              label="Website"
              placeholder="Your personal/professinal website"
              className={classes.textField}
              value={state.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              tpye="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={state.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

EditDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditDetails);
