import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'
import blogService from '../services/blogs'

const BlogPage = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const history = useHistory()
  const blog = props.blog

  if (!blog) {
    return null
  }

  const handleLikeClick = async () => {
    const newLikes = blog.likes + 1
    const updatedBlog = { ...blog, likes: newLikes }
    const response = await blogService.update(updatedBlog)
    dispatch(addLike(response))
  }

  const isSameUser = (blog) => {
    if (blog.user.username === user.username) {
      return true
    } else {
      return false
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      await blogService.removeOne(blog)
      dispatch(removeBlog(blog))
      history.push('/')
    }
  }

  const showRemoveBlog = () => {
    if (isSameUser(blog)) {
      return (
        <button
          onClick={handleRemove}
          style={{ backgroundColor: 'blue', borderRadius: 5 }}
        >
          Remove
        </button>
      )
    }
  }

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>

      <p>url: {blog.url}</p>
      <p>
        {blog.likes} likes <button onClick={handleLikeClick}> like </button>
      </p>
      <p>added by {blog.user.name}</p>
      {showRemoveBlog()}
    </div>
  )
}

export default BlogPage
