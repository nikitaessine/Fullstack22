import React from 'react'
import '@testing-library/jest-dom'
import { waitFor } from '@testing-library/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const user = {
    username: 'testuser'
  }

  render(
    <Blog blog={blog} user={user} />
  )

  expect(screen.getByText('Test Title Test Author')).toBeInTheDocument()
  expect(screen.queryByText('http://test.com')).not.toBeInTheDocument()
  expect(screen.queryByText('likes 5')).not.toBeInTheDocument()
})

test('renders all details when view button is clicked', async () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const user = {
    username: 'testuser'
  }

  render(
    <Blog blog={blog} user={user} />
  )

  const button = screen.getByText('view')
  userEvent.click(button)

  await waitFor(() => {
    expect(screen.getByText('http://test.com')).toBeInTheDocument()
    expect(screen.getByText('likes 5')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })
})

test('calls the like handler twice when the like button is clicked twice', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'is.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const user = {
    username: 'testuser'
  }

  const handleLike = jest.fn()

  render(
    <Blog blog={blog} user={user} handleLike={handleLike} />
  )

  const viewButton = screen.getByText('view')
  userEvent.click(viewButton)

  await waitFor(() => {
    const likeButton = screen.getByText('like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)
  })

  await waitFor(() => {})

  expect(handleLike).toHaveBeenCalledTimes(2)
})