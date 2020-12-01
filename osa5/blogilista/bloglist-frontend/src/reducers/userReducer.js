const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return action.data
    default:
      return state
  }
}

export const addUser = (user) => {
    return {
        type:'ADD_USER',
        data: user
    }
}

export default userReducer
