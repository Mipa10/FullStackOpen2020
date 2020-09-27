import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exerciseCount={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exerciseCount={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exerciseCount={props.parts[2].exercises} />
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exerciseCount}
    </p>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
