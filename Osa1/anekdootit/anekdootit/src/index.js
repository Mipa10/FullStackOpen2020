import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  let [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0));

  const setNewAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const voteAnecdote = () => {
    let copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const anecdoteIndexWithMostVotes = () => {
    let i = 0;
    let mostPoints = 0;
    let indexOfMostPoints = 0;

    points.forEach((element) => {
      if (element > mostPoints) {
        mostPoints = element;
        indexOfMostPoints = i;
        
      }
      i++;
    });
    console.log(indexOfMostPoints);
    return (
      indexOfMostPoints
    )
      

  };

  return (
    <div>
      {props.anecdotes[selected]}
      <br />
      <h2>Votes {points[selected]}</h2>
      <button onClick={voteAnecdote}>
        Vote
      </button>
      <button onClick={setNewAnecdote}>next anecdote</button>
      <br />
      <h2>
        Anecdote with most votes
      </h2>
      <p>{props.anecdotes[anecdoteIndexWithMostVotes()]}</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
