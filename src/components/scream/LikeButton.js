import React from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// REdux
import { useDispatch, useSelector } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

const LikeButton = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const likedScream = () => {
    if (
      user.likes &&
      user.likes.find((like) => like.screamId === props.screamId)
    )
      return true;
    else return false;
  };
  const likeAScream = () => {
    dispatch(likeScream(props.screamId));
  };
  const unlikeAScream = () => {
    dispatch(unlikeScream(props.screamId));
  };
  const { authenticated } = user;
  const likeButton = !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={unlikeAScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likeAScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
  return likeButton;
};

LikeButton.propTypes = {
  screamId: PropTypes.string,
};

export default LikeButton;
