const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CURRENT_USER':
      return action.data
    default:
      return state
  }
}

export const addUser = (user) => {
    return {
        type:'ADD_CURRENT_USER',
        data: user
    }
}

export default userReducer
