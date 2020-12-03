import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'


const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  return (
    <Form id="loginform" onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />

        <Form.Label>password</Form.Label>

        <Form.Control
          id="password"
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />

        <Button variant="primary" id="loginbutton" type="submit">
          login
        </Button>
      </Form.Group>
    </Form>
  )
}

export default LoginForm
