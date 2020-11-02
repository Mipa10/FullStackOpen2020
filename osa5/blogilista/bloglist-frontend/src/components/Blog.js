import React, { useState } from "react";

const Blog = ({ blog }) => {
  const blogStyle = {
    borderStyle: "solid",
    borderRadius: 5,
    marginBottom: 3,
    marginTop: 3,
    paddingTop: 5,
  };
  const [visible, SetVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "inline-block" };
  const showWhenVisible = { display: visible ? "inline-block" : "none" };

  const toggleVisibility = () => {
    SetVisible(!visible);
  };
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
      </div>
      <br />
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes: {blog.likes} 
        <button>like</button><br />
        {console.log('blogi', blog)}
        
        Added by: {blog.user.name}
        
      </div>
    </div>
  );
};

export default Blog;
