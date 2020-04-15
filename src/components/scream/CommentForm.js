import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI Stuff
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
// Redux stuff
import { useDispatch, useSelector } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

import { useForm } from "../../util/hooks";

const styles = (theme) => ({
  ...theme.main,
});

const CommentForm = (props) => {
  const { classes } = props;

  const { loading, errors } = useSelector((state) => state.UI);
  const authenticated = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();

  const initialState = {
    body: "",
  };

  const { onChange, onSubmit, values } = useForm(
    submitCommentCallback,
    initialState
  );

  function submitCommentCallback() {
    dispatch(submitComment(props.screamId, values));
  }
  //TODO: If no error and not loading empty the body!

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={onSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors && errors.comment ? true : false}
          helperText={errors && errors.comment}
          value={values.body}
          onChange={onChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
  return commentFormMarkup;
};

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
};

export default withStyles(styles)(CommentForm);
