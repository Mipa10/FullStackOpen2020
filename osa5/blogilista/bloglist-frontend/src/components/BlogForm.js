import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onTitleChange = ({ target }) => setTitle(target.value)
  const onAuthorChange = ({ target }) => setAuthor(target.value)
  const onUrlChange = ({ target }) => setUrl(target.value)

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      <div>
        Title:
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={onTitleChange}
        />
        <br />
        Author:
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={onAuthorChange}
        />
        <br />
        Url:
        <input
          id="url"
          type="text"
          value={url}
          name="Url"
          onChange={onUrlChange}
        />
      </div>
      <br />
      <button id="create" type="submit">
        Create
      </button>
      <br />
      <br />
    </form>
  )
}

export default BlogForm
