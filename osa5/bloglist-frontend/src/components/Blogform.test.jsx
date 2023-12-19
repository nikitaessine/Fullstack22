import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './Blogform'

test('calls the createBlog function with the right details when a new blog is created', async () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)


  const inputTitle = screen.getByLabelText('title:')
  const inputAuthor = screen.getByLabelText('author:')
  const inputUrl = screen.getByLabelText('url:')


  await userEvent.type(inputTitle, 'Test Title')
  await userEvent.type(inputAuthor, 'Test Author')
  await userEvent.type(inputUrl, 'http://test.com')
  await userEvent.click(screen.getByText('create'))

  expect(createBlog).toHaveBeenCalledWith({
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://test.com'
  })
})