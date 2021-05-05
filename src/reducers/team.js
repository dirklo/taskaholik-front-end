const initialState = {
    teams: []
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
                teams: [...action.payload]
            }
        case "SET_CURRENT_TEAM":
            let newTeams = state.teams.map(team => {
                if (team.id === action.payload) {
                    return {...team, selected: true}
                } else {
                    return {...team, selected: false}
                }
            })
            return {
                ...state,
                teams: newTeams
            }
        case "ADD_TEAM":
            team = action.payload
            team.selected = true

            return {
                ...state,
                teams: [...state.teams, team]
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
        default:
            return state
    }
}