import React, { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleNewBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="title">title:</label>
        <input
          id="title"
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleNewBlogChange}
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input
          id="author"
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleNewBlogChange}
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input
          id="url"
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleNewBlogChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm