import { createStore, combineReducers, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer'
import filterReducer from '../reducers/filterReducer'

const red = combineReducers({
    notification: notificationReducer,
    anecdotes: anecdoteReducer,
    filter: filterReducer
  })

const store = createStore(
    red,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
)

export default store
