import store from '../store'

export function currentTeam() {
    return store.getState().team.teams.find(team => team.selected === true)
}

export function currentProject() {
    return store.getState().project.projects.find(project => project.selected === true)
}

export function currentTask() {
    return store.getState().task.tasks.find(task => task.selected === true)
}

export function currentDetail() {
    return store.getState().detail.details.find(detail => detail.selected === true)
}

export function parseTimestamp(timestamp) {
    const date = new Date(timestamp)
    let hours = date.getUTCHours()%12
    hours = hours === 0 ? 12 : hours
    const minutes = ('0' + date.getUTCMinutes()).slice(-2)
    const ampm = date.getUTCHours() > 12 ? 'PM' : 'AM'
    return date.toDateString() + ', ' + hours + ':' + minutes + ' ' + ampm
}
 