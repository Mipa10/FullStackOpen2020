import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, getByText, render } from '@testing-library/react'
import Blog from './Blog'

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
  expect(component.container).toHaveTextContent('aaaauthor')
  const div = component.container.querySelector('.hidedElements')
  expect(div).not.toBeVisible()
})

test('renders url and likes when button pressed', () => {
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

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.hidedElements')
  expect(div).toBeVisible()
})
