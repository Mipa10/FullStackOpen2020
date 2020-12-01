const initialState = []

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.data]
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const addUser = (user) => {
  return {
    type: 'ADD_USER',
    data: user,
  }
}

export const initUsers = (users) => {
  return {
    type: 'INIT_USERS',
    data: users,
  }
}

export default usersReducer
