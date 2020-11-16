import React from "react";
import { addFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = ({ addFilter }) => {
  const handleChange = (event) => {
    const filter = event.target.value;
    addFilter(filter);
  };

  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  );
};

const ConnectedFilter = connect(null, { addFilter })(Filter);

export default ConnectedFilter;
