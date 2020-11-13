import React from "react";
import { addFilter } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filter = event.target.value;
    dispatch(addFilter(filter));
  };

  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
