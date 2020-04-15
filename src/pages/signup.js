import React from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import { Link } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

//MUI staff
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  TextField
} from "@material-ui/core";

import { useForm } from "../util/hooks";

const styles = theme => ({
  ...theme.main
});

const SignUp = props => {
  const { loading, errors } = useSelector(state => state.UI);
  const dispatch = useDispatch();
  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    handle: ""
  };
  const { classes } = props;

  const { onChange, onSubmit, values } = useForm(
    signupUserCallback,
    initialState
  );

  function signupUserCallback() {
    dispatch(signupUser(values, props.history));
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          SignUp
        </Typography>
        <form noValidate onSubmit={onSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors && errors.email}
            error={errors && errors.email ? true : false}
            value={values.email}
            onChange={onChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors && errors.password}
            error={errors && errors.password ? true : false}
            value={values.password}
            onChange={onChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            helperText={errors && errors.confirmPassword}
            error={errors && errors.confirmPassword ? true : false}
            value={values.confirmPassword}
            onChange={onChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            className={classes.textField}
            helperText={errors && errors.handle}
            error={errors && errors.handle ? true : false}
            value={values.handle}
            onChange={onChange}
            fullWidth
          />
          {errors && errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            SignUp
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account ? Login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
