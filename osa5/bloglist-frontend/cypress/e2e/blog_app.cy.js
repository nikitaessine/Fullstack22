describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.request('POST', 'http://localhost:3003/api/users/', {
        username: 'testuser', password: 'testpassword', name: 'testuser'
      })
      cy.request('POST', 'http://localhost:3003/api/login/', {
        username: 'testuser', password: 'testpassword'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })


    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('A new blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('http://test.com')
      cy.get('#create-button').click()

      cy.contains('New blog A new blog by Test Author added')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('A blog to like')
      cy.get('#author').type('testuser')
      cy.get('#url').type('http://test.com')
      cy.get('#create-button').click()

      cy.contains('New blog A blog to like by testuser added')

      cy.contains('view').click()
      cy.wait(2000)
      cy.contains('like').click()
      cy.wait(2000)

      cy.contains('likes 1')
    })

    it('A blog can be deleted by the user who added it', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('A new blog')
      cy.get('#author').type('testuser')
      cy.get('#url').type('http://test.com')
      cy.get('#create-button').click()

      cy.contains('New blog A new blog by testuser added')

      cy.contains('view').click()
      cy.contains('remove').click()

      cy.get('html').should('not.contain', 'A new blog testuser')
    })

    it('Only the user who added a blog can see the remove button', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('recently added blog')
      cy.get('#author').type('testuser')
      cy.get('#url').type('http://test.com')
      cy.get('#create-button').click()

      cy.contains('New blog recently added blog by testuser added')

      cy.contains('view').click()
      cy.contains('remove')


      cy.contains('logout').click()


      cy.request('POST', 'http://localhost:3003/api/users/', {
        username: 'otheruser', password: 'otherpassword', name: 'Other User'
      })
      cy.request('POST', 'http://localhost:3003/api/login/', {
        username: 'otheruser', password: 'otherpassword'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })

      cy.contains('view').click()
      cy.get('.remove-button').should('not.exist')
    })
  })
})