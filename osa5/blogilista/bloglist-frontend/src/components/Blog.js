import React, { useState } from 'react'

const Blog = ({ blog, addLike, isSameUser, removeBlog }) => {
  const blogStyle = {
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 3,
    marginTop: 3,
    paddingTop: 5,
  }
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : 'inline-block' }
  const showWhenVisible = { display: visible ? 'inline-block' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const newAmount = likes + 1
    await setLikes(newAmount)
    const updatedBlog = blog
    updatedBlog.likes = newAmount

    addLike(updatedBlog)
  }

  const remove = () => {
    removeBlog(blog)
  }

  const showRemoveBlog = () => {
    if (isSameUser(blog)) {
      return (
        <button
          onClick={remove}
          style={{ backgroundColor: 'blue', borderRadius: 5 }}
        >
          Remove
        </button>
      )
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
      </div>
      <br />
      <div className="hidedElements" style={showWhenVisible}>
        {blog.url} <br />
        likes: {likes}
        <button onClick={handleLike}>like</button>
        <br />
        Added by: {blog.user.name}
        <br />
        {showRemoveBlog()}
      </div>
    </div>
  )
}

export default Blog
