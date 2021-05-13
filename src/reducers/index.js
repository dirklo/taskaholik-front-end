// src/reducers/index.js
import { combineReducers } from 'redux'
import authReducer from './auth'
import teamReducer from './team'
import projectReducer from './project'
import taskReducer from './task'
import detailReducer from './detail'

export default combineReducers({
  auth: authReducer,
  team: teamReducer,
  project: projectReducer,
  task: taskReducer,
  detail: detailReducer,
})