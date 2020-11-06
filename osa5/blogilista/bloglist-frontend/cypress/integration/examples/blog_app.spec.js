describe('Blog ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      name: 'mikko',
      username: 'mikko',
      password: 'salainen',
    })
    cy.visit('http://localhost:3000')
  })
  it('loginform is shown', function () {
    cy.contains('blogs')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mikko')
      cy.get('#password').type('salainen')
      cy.get('#loginbutton').click()
      cy.contains('mikko logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mikko')
      cy.get('#password').type('salaine')
      cy.get('#loginbutton').click()
      cy.contains('wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'mikko',
        password: 'salainen',
      }).then((response) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      })
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('tiiitle')
      cy.get('#author').type('auuuthor')
      cy.get('#url').type('uuurl')
      cy.get('#create').click()
      cy.get('#bloglist').contains('tiiitle')
    })
    describe('and a blog exist', function () {
      beforeEach(function () {
        cy.contains('New Blog').click()
        cy.get('#title').type('tiiitle')
        cy.get('#author').type('auuuthor')
        cy.get('#url').type('uuurl')
        cy.get('#create').click()
        cy.get('#bloglist').contains('tiiitle')
      })
      it('a blog can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })
      it('a blog can be removed', function () {
        cy.contains('view').click()
        cy.contains('Remove').click()
        cy.get('#bloglist').should('not.contain', 'tiiitle')
      })
      it.only('a blog can only be removed by user who added it', function () {
        cy.request('POST', 'http://localhost:3001/api/users', {
          name: 'matti',
          username: 'matti',
          password: 'salainen',
        })
        cy.contains('Logout').click()
        cy.get('#username').type('matti')
        cy.get('#password').type('salainen')
        cy.get('#loginbutton').click()
        cy.contains('view').click()
        cy.get('#bloglist').should('not.contain', 'Remove')

      })
    })
  })
})
