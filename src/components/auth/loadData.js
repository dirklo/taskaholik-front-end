import React from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import { populateTeams } from "../../actions/team";
import LoadingSpinner from "../LoadingSpinner";

function loadData(WrappedComponent) {
  class Wrapper extends React.Component {
    componentDidMount() {
        if (!this.props.teamsPopulated) {
            this.props.populateTeams(
                this.props.currentUser.id || this.props.currentUser.data.id,
                1
            )
        }
    }

    render() {
        if (this.props.teamsPopulated) {
            return this.props.teams.length > 0 ?
                <WrappedComponent {...this.props} />
            :
                <Redirect to="/teams/new" />
        } else {
            return <LoadingSpinner />;
        }
    }
  }

  return connect((state) => {
      return {
          currentUser: state.auth.currentUser,
          teamsPopulated: state.team.populated,
          teams: state.team.teams
      }
  }, { populateTeams })(Wrapper);
}

export default loadData;
