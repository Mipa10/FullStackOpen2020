import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteNote } from "../reducers/anecdoteReducer";
import {addNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  console.log('anecdotes', anecdotes)
  
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteNote(anecdote.id));
    dispatch(addNotification(`You voted '${anecdote.content}'`))
    setTimeout(()=>dispatch(removeNotification()), 5000)
    

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

export default AnecdoteList;
