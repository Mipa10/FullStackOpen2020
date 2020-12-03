import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'
import blogService from '../services/blogs'

const BlogPage = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const history = useHistory()
  const blog = props.blog
  const [comment, setComments] = useState('')

  if (!blog) {
    return null
  }

  const handleLikeClick = async () => {
    const newLikes = blog.likes + 1
    const updatedBlog = { ...blog, likes: newLikes }
    const response = await blogService.update(updatedBlog)
    dispatch(updateBlog(response))
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
  const handleCommentAdd = async (event) => {
    event.preventDefault()

    const response = await blogService.addComment(comment, blog.id)
    dispatch(updateBlog(response))
  }

  const onCommentChange = (event) => {
    setComments(event.target.value)
  }

  const commentForm = () => {
    return (
      <form onSubmit={handleCommentAdd}>
        <div>
          <input
            id="commentt"
            type="text"
            name="commentt"
            value={comment}
            onChange={onCommentChange}
          />
        </div>
        <button id="create" type="submit">
          Send
        </button>
      </form>
    )
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

      <h3>comments</h3>
      {commentForm()}
      <ul>
        {blog.comments.map((comment) => {
          return <li key={comment}>{comment}</li>
        })}
      </ul>
    </div>
  )
}

export default BlogPage
