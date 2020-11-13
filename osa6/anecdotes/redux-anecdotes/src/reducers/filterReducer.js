const initialState = "";

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDFILTER":
      return action.filter;
    default:
      return state;
  }
};

export const addFilter = (filter) => {
  return {
    type: "ADDFILTER",
    filter,
  };
};

export default filterReducer;
