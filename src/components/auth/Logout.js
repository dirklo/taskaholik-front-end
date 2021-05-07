import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth";
import { useHistory } from "react-router-dom";

const Logout = ({ logoutUser }) => {
  const history = useHistory();
  
  const handleClick = () => {
    logoutUser()
    .then(() => history.push("/"));
  };

  return (
    <button onClick={handleClick}>
      Logout
    </button>
  );
};

export default connect(null, { logoutUser })(Logout);