import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      
    }
  }, [])

  const handleBlogAdd = async (event) => {

    event.preventDefault();

    try {
      await blogService.create({
        title: title,
        author: author,
        url:url
      })
      setSuccessMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);


    } catch (exception) {
      
    }

  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user);
      setUsername("");
      setPassword("");

      blogService.setToken(user.token)
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    console.log("logging in with", username, password);
  };
  const handleLogout = event => {
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
    );
  };

  const blogForm = () => {
    return(
      <form onSubmit = {handleBlogAdd}>
        <h2>Create new</h2>
        <div>
          Title:
        <input
          type="text"
          value = {title}
          name = "Title"
          onChange = {({target}) => setTitle(target.value)}
        /><br/>
          Author:
        <input
          type="text"
          value = {author}
          name = "Author"
          onChange = {({target}) => setAuthor(target.value)}
        /><br/>
          Url:
        <input
          type="text"
          value = {url}
          name = "Url"
          onChange = {({target}) => setUrl(target.value)}
        />
        </div>
        <br/>
        <button type="submit">Create</button>
        <br/><br/>

      </form>
    )
  }

  const bloglist = () => {
    return (
      <div>
        <p>{user.name} logged in</p>
        <button  onClick = {handleLogout}>Logout</button>
        {blogForm()}
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };
  const Notification = ({message}) => {
    if (message === null) {
      return null
    } else if (message === errorMessage) {
      return (
        <div className="error">
          {message}
        </div>
      )
    } else if (message === successMessage) {
      return (
        <div className="success">
          {message}
        </div>
      )
    }
    
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message = {errorMessage}/>
      <Notification message = {successMessage}/>

      {user == null ? loginForm() : bloglist()}
    </div>
  );
};

export default App;
