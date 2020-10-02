import React from "react";

const Notification = ({ message, errorMessage }) => {
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null && errorMessage === null) {
    return null;
  } else if (errorMessage === null) {
    return (
      <div>
        <div style={notificationStyle}>{message}</div>
      </div>
    );
  } else {
    return (
      <div>
        <div style={errorStyle}>{errorMessage}</div>
      </div>
    );
  }
};

export default Notification;
