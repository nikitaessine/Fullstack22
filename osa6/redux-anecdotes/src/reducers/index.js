import { combineReducers } from 'redux'
import anecdoteReducer from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReducer'
import notificationReducer from '../reducers/notificationReducer'

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer
})

export default rootReducer