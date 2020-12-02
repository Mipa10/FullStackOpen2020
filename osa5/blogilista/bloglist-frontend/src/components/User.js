import React from 'react'

const User = (props) => {
  if (!props.user) {
    return null
  }

  return (
    <div>
      <h1>{props.user.name}</h1>
      <h3 style={{ fontWeight: 'bold' }}>added blogs</h3>
      <ul>
        {props.user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
