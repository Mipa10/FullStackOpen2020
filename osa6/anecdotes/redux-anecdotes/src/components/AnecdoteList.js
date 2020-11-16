import React from "react";
import { connect} from "react-redux";
import { voteNote } from "../reducers/anecdoteReducer";
import { addNotification } from "../reducers/notificationReducer";

const AnecdoteList = ({ anecdotes, voteNote, addNotification }) => {
  

  const vote = (anecdote) => {
    voteNote(anecdote);
    addNotification(`You voted '${anecdote.content}'`, 5);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const filteredAnecdotes = state.anecdotes.filter((anecdote) =>
    anecdote.content.includes(state.filter)
  );

  return {
    anecdotes: filteredAnecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = {voteNote, addNotification}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);

export default ConnectedAnecdoteList;
