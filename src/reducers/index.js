// src/reducers/index.js
import { combineReducers } from 'redux'
import authReducer from './auth'
import populateReducer from './populate'
import taskReducer from './task'

export default combineReducers({
  auth: authReducer,
  populate: populateReducer,
  task: taskReducer
})