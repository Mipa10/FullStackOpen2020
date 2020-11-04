import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addLikeToBlog = (blog) => {
    const newBlogs = blogs.map((item) => {
      if (item.id === blog.id) {
        item.likes = blog.likes

        blogService.update(item)
      }
      return item
    })

    setBlogs(newBlogs)
  }

  const handleBlogAdd = async (blogObject) => {
    try {
      const response = await blogService.create({
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
      })

      setBlogs(blogs.concat(response))
      setSuccessMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogRemove = async (blog) => {
    // console.log('handleblogremove', blog)
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      const newBlogs = blogs.filter((item) => {
        return item.id !== blog.id
      })
      setBlogs(newBlogs)

      await blogService.removeOne(blog)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')

      blogService.setToken(user.token)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="New Blog">
        <BlogForm createBlog={handleBlogAdd} />
      </Togglable>
    )
  }

  const isSameUser = (blog) => {
    if (blog.user.username === user.username) {
      return true
    } else {
      return false
    }
  }

  const sortedBlogsByLikes = () => {
    const sortedBlogs = blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    return sortedBlogs.map((blog) => (
      <Blog
        removeBlog={handleBlogRemove}
        isSameUser={isSameUser}
        addLike={addLikeToBlog}
        key={blog.id}
        blog={blog}
      />
    ))
  }

  const bloglist = () => {
    return (
      <div>
        <p>
          {user.name} logged in<button onClick={handleLogout}>Logout</button>
        </p>

        {blogForm()}
        {sortedBlogsByLikes()}
      </div>
    )
  }
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    } else if (message === errorMessage) {
      return <div className="error">{message}</div>
    } else if (message === successMessage) {
      return <div className="success">{message}</div>
    }
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />
      <Notification message={successMessage} />

      {user == null ? loginForm() : bloglist()}
    </div>
  )
}

export default App