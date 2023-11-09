const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {


    const body = request.body

    if (!body.title) {
      return response.status(400).json({
          error: 'no title'
      })
    }
  
    if (!body.url) {
      return response.status(400).json({
          error: 'no url'
      })
    }

    const user = await User.findById(body.user)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
      likes: body.likes || 0
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
      const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
      if (deletedBlog) {
          response.status(204).end()
      } else {
          response.status(404).json({ error: 'Blog not found' })
      }
  } catch (error) {
      response.status(500).json({ error: 'Server error' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    if (updatedBlog) {
      response.json(updatedBlog.toJSON())
    } else {
      response.status(404).json({ error: 'Blog not found' })
    }
  } catch (error) {
    response.status(500).json({ error: 'Server error' })
  }
})

module.exports = blogsRouter
  