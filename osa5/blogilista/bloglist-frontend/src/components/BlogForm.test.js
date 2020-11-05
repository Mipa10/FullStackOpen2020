import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

const blog = {
  title: 'tiiitle',
  author: 'aaaauthor',
  url: 'uuurli',
  user: {
    name: 'mikko',
  },
  likes: 4,
}

test('if right data', () => {
  const mockHandler = jest.fn()

  const component = render(<BlogForm createBlog={mockHandler} />)

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  fireEvent.change(titleInput, {
    target: { value: 'titleinputti' },
  })
  fireEvent.change(authorInput, {
    target: { value: 'authorinputti' },
  })
  fireEvent.change(urlInput, {
    target: { value: 'urlinputti' },
  })

  fireEvent.submit(component.container.querySelector('form'))

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe(
    'titleinputti'
  )
  expect(mockHandler.mock.calls[0][0].author).toBe(
    'authorinputti'
  )
  expect(mockHandler.mock.calls[0][0].url).toBe(
    'urlinputti'
  )
})
