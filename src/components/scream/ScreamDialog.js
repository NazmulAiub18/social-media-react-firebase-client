import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
// Redux stuff
import { useDispatch, useSelector } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.main,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

const ScreamDialog = (props) => {
  const { classes } = props;
  const { loading } = useSelector((state) => state.UI);
  const {
    screamId,
    body,
    createdAt,
    likeCount,
    commentCount,
    userImage,
    userHandle,
    comments,
  } = useSelector((state) => state.data.scream);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    open: false,
    oldPath: "",
    newPath: "",
  });

  useEffect(() => {
    if (props.openDialog) {
      handleOpen();
    }
  }, []);

  const handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, screamId } = props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    setState({ ...state, open: true, oldPath, newPath });
    dispatch(getScream(props.screamId));
  };
  const handleClose = () => {
    window.history.pushState(null, null, state.oldPath);
    setState({ ...state, open: false });
    dispatch(clearErrors());
  };

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
    </Grid>
  );
  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
};

ScreamDialog.propTypes = {
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScreamDialog);
