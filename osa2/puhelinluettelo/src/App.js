import React, { useEffect, useState } from "react";
import phonebook from "./services/phonebook";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phonebook.getAll().then((response) => setPersons(response));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleDelete = async (id) => {
    const name = persons.find((person) => id === person.id);
    if (window.confirm(`poistetaanko ${name.name}`)) {
      await phonebook.del(id);
      phonebook.getAll().then((response) => setPersons(response));
      setNewName("");
    }
  };

  const handleUpdate = (id, nameObject) => {
    console.log("täällä kans");
    console.log("id", id);

    phonebook.update(id, nameObject).then((changedObject) => {
      console.log(changedObject);

      const newPersons = persons.map((person) =>
        person.id !== id ? person : changedObject
      );
      setPersons(newPersons);
    });
  };

  const handleSaveClick = (event) => {
    event.preventDefault();
    if (
      persons.some((person) => person.name === newName) &&
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with new one?`
      )
    ) {
      const nameObject = {
        name: newName,
        number: newNumber,
      };
      persons.forEach((person) => {
        if (person.name === newName) {
          handleUpdate(person.id, nameObject);
        }
      });
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };
      phonebook
        .create(nameObject)
        .then((response) => setPersons(persons.concat(response)));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSaveClick={handleSaveClick}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
