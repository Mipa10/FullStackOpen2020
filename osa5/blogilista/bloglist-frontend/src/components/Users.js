import React, { useEffect, useState } from 'react'
import userService from '../services/users'

const Users = () => {
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    userService.getUsers().then((response) => setAllUsers(response))
  }, [])

  console.log('allusers', allUsers)

  console.log('again', allUsers)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <td></td>
        <td style={{ fontWeight: 'bold' }}>blogs created</td>
        {allUsers.map((user) => (
          <tr>
            <td key={user.id}>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Users
