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

  if (message === "" && errorMessage === "") {
    return null;
  }
  return (
    <div style={notificationStyle}>
      <div>{message}</div>
      <div style={{color:'red'}}>{errorMessage}</div>
    </div>
  );
};

export default Notification;
