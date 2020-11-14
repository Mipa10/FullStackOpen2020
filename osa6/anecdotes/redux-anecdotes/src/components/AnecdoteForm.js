import React from "react";
import { add } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { addNotification } from "../reducers/notificationReducer";



const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    const anecdote = event.target.anecdote.value
    event.preventDefault();
    event.target.anecdote.value = "";
    dispatch(add(anecdote));
    dispatch(addNotification(`You added '${anecdote}'`, 5));

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

export default AnecdoteForm;
