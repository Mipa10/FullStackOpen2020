import React, { useEffect, useState } from "react";
import blogServices from '../services/blogs'

const Blog = ({ blog, addLike }) => {
  const blogStyle = {
    borderStyle: "solid",
    borderRadius: 5,
    marginBottom: 3,
    marginTop: 3,
    paddingTop: 5,
  };
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes)

  // useEffect(()=> {
    
  //   setLikes(0)
  // },[])

  const hideWhenVisible = { display: visible ? "none" : "inline-block" };
  const showWhenVisible = { display: visible ? "inline-block" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    const newAmount = likes + 1;
    await setLikes(newAmount)
    const updatedBlog = blog
    updatedBlog.likes = newAmount
    
    
    addLike(updatedBlog)

  }

  


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
        likes: {likes} 
        <button onClick = {handleLike}>like</button><br />
        
        
        Added by: {blog.user.name}
        
      </div>
    </div>
  );
};

export default Blog;
