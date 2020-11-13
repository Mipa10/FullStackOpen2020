const initialState = "Tämä on notifikaatio";

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET":
      return state;
    default:
      return state;
  }
};

export default notificationReducer
