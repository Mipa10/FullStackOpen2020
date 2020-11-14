const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const newState = state.map((anecdote) => {
        if (anecdote.id === action.id) {
          return { ...anecdote, votes: anecdote.votes + 1 };
        }
        return anecdote;
      });

      newState.sort((a, b) => b.votes - a.votes);

      return newState;

    case "ADD":
      const newAnecdote = action.content;
      console.log('NEWANE', newAnecdote)
      
      return state.concat(newAnecdote);
    case "INIT_ANECDOTES":
      return action.content
    default:
      return state;
  }
};

export const add = (anecdote) => {
  return {
    type: "ADD",
    content: anecdote
  };
};

export const voteNote = (id) => {
  return {
    type: "VOTE",
    id,
  };
};

export const initAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    content: anecdotes,
  };
};


export default anecdoteReducer;
