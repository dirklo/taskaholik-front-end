import React, { useEffect, useState, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import './Dashboard.css'
import TaskContainer from '../dashboard/TaskContainer'
import TeamToolbar from '../dashboard/TeamToolbar'
import MobileDashboard from '../dashboard/MobileDashboard'
import { loadTeamData, setCurrentTeam }  from '../../actions/team'
import { currentTeam } from '../../helpers/helpers'

function Dashboard({ loadTeamData, currentUser, setCurrentTeam }) {

    useEffect(() => {
        if (currentUser.selected_team) {
            setCurrentTeam(currentUser.selected_team, currentUser.id)
        }
        loadTeamData(currentTeam().id)
    }, [loadTeamData, currentUser, setCurrentTeam])
    
    const [width, setWidth] = useState(0)

    useLayoutEffect(() => {
        function updateSize() {
          setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    if (width > 480) {
        return (
            <div className='dashboard'>
                <TaskContainer />
                <TeamToolbar />
            </div>
        )
    } else {
        return (
            <>
                <MobileDashboard />
            </>
        )
    }
}

export default connect((state) => {
    return {
        teams: state.team.teams,
        projects: state.project.projects,
        currentUser: state.auth.currentUser
    }
}, { loadTeamData, setCurrentTeam })(Dashboard)
