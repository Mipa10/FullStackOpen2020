import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
const blog = {
  title: 'tiiitle',
  author: 'aaaauthor',
  url: 'uuurli',
  user: {
    name: 'mikko',
  },
  likes: 4,
}

test('renders only title and author', () => {
  const component = render(<Blog blog={blog} isSameUser={() => true} />)
  expect(component.container).toHaveTextContent('tiiitle')
  expect(component.container).toHaveTextContent('aaaauthor')
  const div = component.container.querySelector('.hidedElements')
  expect(div).not.toBeVisible()
})

test('renders url and likes when button pressed', () => {
  const component = render(<Blog blog={blog} isSameUser={() => true} />)

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.hidedElements')
  expect(div).toBeVisible()
})

test('if like pressed twice, adds 2 likes', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} addLike={mockHandler} isSameUser={() => true} />
  )
  const button = component.getByText('like')

  await fireEvent.click(button)
  await fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
