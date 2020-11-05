import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
import App from '../App'

test('renders only title and author', () => {
  const blog = {
    title: 'tiiitle',
    author: 'aaaauthor',
    url: 'uuurli',
    user: {
      name: 'mikko',
    },
    likes: 4,
  }

  const component = render(<Blog blog={blog} isSameUser={() => true} />)
  expect(component.container).toHaveTextContent('tiiitle')
})
