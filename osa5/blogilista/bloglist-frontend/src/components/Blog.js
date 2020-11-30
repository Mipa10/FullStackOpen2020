import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addLike } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const Blog = ({ blog, isSameUser, removeBlog }) => {
  const dispatch = useDispatch()
  const blogStyle = {
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 3,
    marginTop: 3,
    paddingTop: 5,
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : 'inline-block' }
  const showWhenVisible = { display: visible ? 'inline-block' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikeClick = async () => {
    const newLikes = blog.likes + 1
    const updatedBlog = { ...blog, likes: newLikes }
    const response = await blogService.update(updatedBlog)
    dispatch(addLike(response))
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
        likes: <span className="likes">{blog.likes}</span>
        <button onClick={handleLikeClick}>like</button>
        <br />
        Added by: {blog.user.name}
        <br />
        {showRemoveBlog()}
      </div>
    </div>
  )
}

export default Blog
