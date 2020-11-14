const initialState = "";

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return action.notification;
    case "REMOVE":
      return initialState;
    default:
      return state;
  }
};

export const addNotification = (notification, delay) => {
  return async (dispatch) => {
    await dispatch({
      type: "ADD_NOTIFICATION",
      notification,
    });
    setTimeout(() => {
      dispatch({
        type: "REMOVE",
      });
    }, delay * 1000);
  };
};

export const removeNotification = () => {
  return {
    type: "REMOVE",
  };
};

export default notificationReducer;
