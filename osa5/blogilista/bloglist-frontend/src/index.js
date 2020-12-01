import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import { BrowserRouter as Router } from 'react-router-dom'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer,
  users: usersReducer
})

const store = createStore(reducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
