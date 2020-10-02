import React, { useEffect, useState } from "react";
import phonebook from "./services/phonebook";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const handleDelete = async (personToDelete) => {
    if (window.confirm(`poistetaanko ${personToDelete.name}`)) {
      await phonebook
        .del(personToDelete).then(response => {
          setMessage(`${personToDelete.name} is deleted from phonebook`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        }
      
        )
        .catch((error) => {
          console.log(error)
          setErrorMessage(
            `information of ${personToDelete.name} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
    }
    phonebook.getAll().then((response) => setPersons(response));
    setNewName("");
  };

  const handleUpdate = (personToBeUpdated, nameObject) => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with new one?`
      )
    ) {
      phonebook
        .update(personToBeUpdated.id, nameObject)
        .then((changedObject) => {
          const newPersons = persons.map((person) =>
            person.id !== personToBeUpdated.id ? person : changedObject
          );
          setPersons(newPersons);
          setMessage(`${personToBeUpdated.name} number is updated.`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(
            `information of ${personToBeUpdated.name} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
          setPersons(persons.filter((n) => n.id !== personToBeUpdated.id));
        });
    } else {
      return null;
    }
  };

  const handleSaveClick = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => person.name === newName)) {
      const personToUpdate = persons.find((person) => person.name === newName);
      handleUpdate(personToUpdate, nameObject);
    } else {
      phonebook
        .create(nameObject)
        .then((response) => setPersons(persons.concat(response)));
      setMessage(`Added ${nameObject.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage} />
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
