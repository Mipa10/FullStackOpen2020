import React from "react";
import { useHistory } from "react-router-dom";

import { useField } from "../hooks/index";

const CreateNew = (props) => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content:content.value,
      author:author.value,
      info:info.value,
      votes: 0,
    });
    history.push("/");
  };

  const handleReset = (e) => {
    e.preventDefault();
    content.reset()
    author.reset()
    info.reset()
  }

  const content = useField("content");
  const author = useField("author");
  const info = useField("info");

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
