import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = (props) => {
  let { good, neutral, bad } = props;

  const getAverage = () => {
    if (good + neutral + bad === 0) {
      return 0;
    }
    return (good - bad) / (good + neutral + bad);
  };

  const getPositiveAverage = () => {
    if (good + neutral + bad === 0) {
      return 0;
    }
    return good / (good + neutral + bad);
  };

  if (good + neutral + bad === 0) {
    return <p>no feedback given</p>;
  } else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticsLine text="Good" value={good} />
            <StatisticsLine text="Neutral" value={neutral} />
            <StatisticsLine text="Bad" value={bad} />
            <StatisticsLine text="All" value={good + neutral + bad} />
            <StatisticsLine text="Average" value={getAverage()} />
            <StatisticsLine text="Positive" value={getPositiveAverage()} />
          </tbody>
        </table>
      </div>
    );
  }
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.name}</button>;
};

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);



  const handleGoodClick = (event) => {
    console.log(event.target.body)
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGoodClick} name="Good" />
      <Button onClick={handleNeutralClick} name="Neutral" />
      <Button onClick={handleBadClick} name="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
