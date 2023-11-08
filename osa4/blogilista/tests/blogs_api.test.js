const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('there are two blogs', async () => {
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

afterAll(async () => {
  await mongoose.connection.close()
})