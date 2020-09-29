import React from "react";

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Content = ({ parts }) => {
  const partsArray = parts.map((part) => {
    return (
      <Part key={part.id} name={part.name} exerciseCount={part.exercises} />
    );
  });
  return <div>{partsArray}</div>;
};

const Part = ({ name, exerciseCount }) => (
  <p>
    {name} {exerciseCount}
  </p>
);

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <h4>Total of {total} exercises</h4>;
};

const Course = ({ course }) => {
  const { name, parts, id } = course;
  return (
    <div>
      <Header name={name} key={id} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default Course;
