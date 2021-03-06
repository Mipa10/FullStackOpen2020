const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const addNotification = (notification) => {
  return {
    type: 'ADD_NOTIFICATION',
    notification,
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  }
}

export default notificationReducer
