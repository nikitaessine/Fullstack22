const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(3)
  })
  

test('all blogs have field called id', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].id).toBeDefined()
  })

test('a valid blog can be added and amount of blogs is increased', async () => {
    const newBlog = {
        title: 'testi',
        author: 'testaaja',
        url: 'testi.fi',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)
      
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(4)

  })

test('if likes is not defined, it is set to 0', async () => {
    const newBlog = {
        title: 'testi2',
        author: 'testaaja2',
        url: 'testi2.fi'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)
      
    const blogsAtEnd = await api.get('/api/blogs')

    const nolikes = blogsAtEnd.body.find(r => r.author === "testaaja2")

    expect(nolikes.likes).toBe(0)
  })

test('responds with 400 if title is missing', async () => {
    const newBlog = {
        author: 'testaaja',
        url: 'testi.fi',
        likes: 0
    }

    await api.post('/api/blogs').send(newBlog).expect(400);
})

test('responds with 400 if url is missing', async () => {
    const newBlog = {
        title: 'testi',
        author: 'testaaja',
        likes: 0
    }

    await api.post('/api/blogs').send(newBlog).expect(400);
})


afterAll(async () => {
  await mongoose.connection.close()
})