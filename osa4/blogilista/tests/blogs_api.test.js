const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('../tests/test_helper')
describe('Blog API tests', () => {
  test('there are three blogs', async () => {
      const response = await api.get('/api/blogs')
    
      expect(response.body).toHaveLength(3)
  })
    
  test('all blogs have field called id', async () => {
      const response = await api.get('/api/blogs')
    
      expect(response.body[0].id).toBeDefined()
  })
})

describe('Blog creation tests', () => {
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
})

describe('Blog validation tests', () => {
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
})

describe('Blog deletion tests', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1)

    const titles = blogsAtEnd.body.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('Blog update tests', () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    let blogToUpdate = blogsAtStart.body[0]
    blogToUpdate.likes += 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await api.get('/api/blogs')
    const updatedBlog = blogsAtEnd.body.find(blog => blog.id === blogToUpdate.id)

    expect(updatedBlog.likes).toBe(blogToUpdate.likes)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})