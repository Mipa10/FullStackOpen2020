import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("")

  const handleFilterChange = (event) => {
    setFilter(event.target.value)

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };


  const handleSaveClick = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("")
    }
  };

  const personsToShow = () => {
    return filter === "" ? persons : persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <input onChange={handleFilterChange} placeholder="Search for name"/>
      <h2>Add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button onClick={handleSaveClick} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow().map((person) => {
        return (
          <p key={person.name}>{person.name} {person.number}</p>
        )
      })}
    </div>
  );
};

export default App;
