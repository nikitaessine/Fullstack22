import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/Blogform'
import PropTypes from 'prop-types'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notify(`Welcome ${user.name}`)
    } catch (exception) {
      notify('wrong credentials', 'error')
    }
  }

  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  const addBlog = async (newBlog) => {
    const returnedBlog = await blogService.create(newBlog)
    returnedBlog.user = user
    setBlogs(blogs.concat(returnedBlog))
    notify(`A new blog ${returnedBlog.title} added`)
    blogFormRef.current.toggleVisibility()
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const likeBlog = async (blogObject) => {
    const blog = {
      ...blogObject,
      likes: blogObject.likes+1
    }
    await blogService.likeBlog(blog)
    setBlogs(blogs.map(b => b.id === blogObject.id ? blog : b))
  }

  const handleRemove = async (id) => {
    if (window.confirm('Do you really want to remove this blog?')) {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  loginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  if (user !== null) {
    return (
      <div>
        {notification.message &&
      <div className={`notification ${notification.type}`}>
        {notification.message}
      </div>
        }
        <h2>Blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={likeBlog} handleRemove={handleRemove} user={user} />
        )}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        {notification.message &&
      <div className={`notification ${notification.type}`}>
        {notification.message}
      </div>
        }
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

}

export default App