const initialState = {
    teams: [],
    populated: false 
}

export default function teamReducer(state = initialState, action) {
    let team;
    let index;

    switch (action.type) {
        case "POPULATE_TEAMS":
            let teams = action.payload
            teams.map(team => team.selected = false)
            return {
                ...state,
                teams: [...action.payload],
            }
        case "SET_CURRENT_TEAM":
            let newTeams = state.teams.map(team => {
                if (team.id === action.payload) {
                    return {...team, selected: true}
                } else {
                    return {...team, selected: false}
                }
            })
            if (!newTeams.find(team => team.selected === true) && newTeams.length > 0) {
                newTeams[0].selected = true
            }
            return {
                ...state,
                teams: newTeams,
                populated: true
        }
        case "ADD_TEAM":
            team = action.payload
            team.selected = true

            return {
                ...state,
                teams: [...state.teams, team]
            }
        case "UPDATE_TEAM":
            index = state.teams.findIndex(team => team.id = action.payload.id)
            team = state.teams[index]
            team.name = action.payload.name
            return {
                ...state, 
                teams: [
                    ...state.teams.slice(0, index),
                    team,
                    ...state.teams.slice(index + 1)
                ]
            }
        case "REMOVE_MEMBER":
            index = state.teams.findIndex(team => team.id === action.payload.teamId)
            team = state.teams[index]
            team.members = team.members.filter(member => action.payload.memberId !== member.id)

            return {
                ...state, 
                teams: [
                    ...state.teams.splice(0, index), 
                    team, 
                    ...state.teams.splice(index + 1)
                ]
            }
        case "ADD_MEMBER":
            index = state.teams.findIndex(team => team.id === action.payload.teamId)
            team = state.teams[index]
            team.members = [...team.members, action.payload.member]

            return {
                ...state, 
                teams: [
                    ...state.teams.splice(0, index), 
                    team, 
                    ...state.teams.splice(index + 1)
                ]
            }
        case "CLEAR_TEAMS":
            return {
                ...state,
                teams: [],
                populated: false
            }
        default:
            return state
    }
}