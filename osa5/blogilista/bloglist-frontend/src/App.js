import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import {
  addNotification,
  removeNotification,
} from './reducers/notificationReducer'
import { initializeBlogs, addNewBlog } from './reducers/blogReducer'
import { addUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import userService from './services/users'
import { initUsers } from './reducers/usersReducer'
import BlogPage from './components/BlogPage'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(addUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    userService.getUsers().then((response) => dispatch(initUsers(response)))
  }, [dispatch])

  const notifyWith = (message, type = 'success') => {
    dispatch(addNotification({ message, type }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  const handleBlogAdd = async (blogObject) => {
    try {
      const response = await blogService.create({
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
      })

      dispatch(addNewBlog(response))

      notifyWith(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    } catch (exception) {
      notifyWith('something went wrong', 'error')
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
      dispatch(addUser(user))

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
    dispatch(addUser(null))
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

  const sortedBlogsByLikes = () => {
    const sortedBlogs = blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    return (
      <div id="blogit">
        {sortedBlogs.map((blog) => (
          <Link key={blog.id + 1} to={`/blogs/${blog.id}`}>
            <Blog key={blog.id} blog={blog} />
          </Link>
        ))}
      </div>
    )
  }

  const loggedUser = () => {
    return (
      <span>
        {user.name} logged in<button onClick={handleLogout}>Logout</button>
      </span>
    )
  }

  const userMatch = useRouteMatch('/users/:id')
  const userToUserpage = userMatch
    ? users.find((useri) => useri.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')

  const blogToBlogpage = blogMatch
    ? blogs.find((blogi) => blogi.id === blogMatch.params.id)
    : null

    const padding = {
      padding:5
    }

  return (
    <div>
      <header style={{backgroundColor:'lightgrey', padding:10}}>
        
        <Link style={padding} to='/'>Blogs</Link>
        <Link style={padding} to='/users'>Users</Link>
      {user === null ? loginForm() : loggedUser()}

        

      </header>
      <h2>Blog App</h2>
      <Notification notification={notification} />
      <Switch>
        <Route path="/users/:id">
          <User user={userToUserpage} />
        </Route>
        <Route path="/blogs/:id">
          <BlogPage blog={blogToBlogpage} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/">
          {blogForm()}
          {sortedBlogsByLikes()}
        </Route>
      </Switch>
    </div>
  )
}

export default App
