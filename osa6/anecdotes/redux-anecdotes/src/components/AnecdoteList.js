import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteNote } from "../reducers/anecdoteReducer";
import { addNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  let anecdotes = useSelector((state) => state.anecdotes);

  const filteri = useSelector((state) => state.filter);

  anecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.includes(filteri)
  );

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteNote(anecdote));
    dispatch(addNotification(`You voted '${anecdote.content}'`, 5));
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
