import React from "react";

const Persons = ({ persons, filter, handleDelete }) => {
  

  const personsToShow = () => {
    return filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toUpperCase().includes(filter.toUpperCase())
        );
  };

  return (
    <div>
      {personsToShow().map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.number}<button onClick = {()=>handleDelete(person)}>Delete</button>
          </p>
        );
      })}
    </div>
  );
};

export default Persons;
