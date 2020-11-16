import React from "react";
import { add } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";
import { addNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ add, addNotification }) => {
  const addAnecdote = async (event) => {
    const anecdote = event.target.anecdote.value;
    event.preventDefault();
    event.target.anecdote.value = "";
    add(anecdote);
    addNotification(`You added '${anecdote}'`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const ConnectedAnecdoteForm = connect(null, { add, addNotification })(
  AnecdoteForm
);

export default ConnectedAnecdoteForm;
