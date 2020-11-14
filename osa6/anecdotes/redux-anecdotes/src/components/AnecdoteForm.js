import React from "react";
import { add } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    const anecdote = event.target.anecdote.value
    event.preventDefault();
    event.target.anecdote.value = "";
    const newAnecdote = await anecdoteService.createNew(anecdote)
    console.log('newanec', newAnecdote)
    
    dispatch(add(newAnecdote));


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
