import React, { useState } from "react";

const Togglable = (props) => {
  const [visible, SetVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    SetVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

export default Togglable
