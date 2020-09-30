import React from "react";

const PersonForm = (props) => {
  const {
    handleNameChange,
    handleNumberChange,
    handleSaveClick,
    newName,
    newNumber,
  } = props;
  return (
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
  );
};

export default PersonForm;
