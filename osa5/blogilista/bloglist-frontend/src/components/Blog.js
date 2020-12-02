import React from 'react'


const Blog = ({ blog }) => {
  const blogStyle = {
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 3,
    marginTop: 3,
    paddingTop: 5,
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
    </div>
  )
}

export default Blog
