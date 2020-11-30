import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { addNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [notification, setNotification] = useState(null)
  const dispatch = useDispatch()
  const notification = useSelector((state) => state)

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

  const notifyWith = (message, type = 'success') => {
    dispatch(addNotification({ message, type }))
    // setNotification({
    //   message,
    //   type,
    // })
    // setTimeout(() => {
    //   setNotification(null)
    // }, 5000)
  }

  const handleBlogAdd = async (blogObject) => {
    try {
      const response = await blogService.create({
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
      })

      setBlogs(blogs.concat(response))

      notifyWith(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    } catch (exception) {
      notifyWith('something went wrong', 'error')
    }
  }

  const handleBlogRemove = async (blog) => {
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
      notifyWith('wrong credentials', 'error')
    }
    console.log('logging in with', username, password)
  }
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => {
    return (
      <form id="loginform" onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="loginbutton" type="submit">
          login
        </button>
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
    return (
      <div id="blogit">
        {sortedBlogs.map((blog) => (
          <Blog
            removeBlog={handleBlogRemove}
            isSameUser={isSameUser}
            addLike={addLikeToBlog}
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    )
  }

  const bloglist = () => {
    return (
      <div id="bloglist">
        <p>
          {user.name} logged in<button onClick={handleLogout}>Logout</button>
        </p>

        {blogForm()}
        {sortedBlogsByLikes()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      {user === null ? loginForm() : bloglist()}
    </div>
  )
}

export default App
