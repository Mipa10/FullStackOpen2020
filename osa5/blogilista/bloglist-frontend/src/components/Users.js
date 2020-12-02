import React from 'react'
import { Link } from 'react-router-dom'

const Users = (props) => {
  const allUsers = props.users

  return (
    <div>
      <h2>Users</h2>

      <table>
        <tbody>
          <tr>
            <td></td>
            <td style={{ fontWeight: 'bold' }}>blogs created</td>
          </tr>

          {allUsers.map((user) => (
            <tr key={user.id + 2}>
              <td key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td key={user.id + 1}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
