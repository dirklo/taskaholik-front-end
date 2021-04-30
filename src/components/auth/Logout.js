import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth";
import { useHistory } from "react-router-dom";

const Logout = ({ dispatchLogoutUser }) => {
  const history = useHistory();
  
  const handleClick = () => {
    dispatchLogoutUser().then(() => history.push("/"));
  };

  return (
    <button onClick={handleClick}>
      Logout
    </button>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogoutUser: () => dispatch(logoutUser())
  };
};

export default connect(null, mapDispatchToProps)(Logout);