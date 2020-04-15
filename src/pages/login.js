import React from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import { Link } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

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

const Login = props => {
  const { loading, errors } = useSelector(state => state.UI);
  const dispatch = useDispatch();
  const initialState = {
    email: "",
    password: ""
  };
  const { classes } = props;

  const { onChange, onSubmit, values } = useForm(
    loginUserCallback,
    initialState
  );

  function loginUserCallback() {
    dispatch(loginUser(values, props.history));
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="APE!" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={onSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            helperText={errors && errors.email}
            error={errors && errors.email ? true : false}
            className={classes.textField}
            value={values.email}
            onChange={onChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            helperText={errors && errors.password}
            error={errors && errors.password ? true : false}
            className={classes.textField}
            value={values.password}
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
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            dont have an account ? sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
