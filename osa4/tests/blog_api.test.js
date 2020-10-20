const { TestScheduler } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { response } = require('../app')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
        }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})


describe('apitests', () => {
    test('return right amount of blogs (2)', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(2)
    })
    test('id is id, not _id', async () => {
      const response = await api.get('/api/blogs')
      const blogs = response.body.forEach(element => {
        expect(element.id).toBeDefined()
      });
    })
    test('able to add one blog', async () => {
      const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      }
      await api.post('/api/blogs', newBlog)
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(3)
    })

    test('if no likes set it to zero', async () => {
      const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        __v: 0,
      }
      await api.post('/api/blogs', newBlog)
      const response = await api.get('/api/blogs')
      expect(response.body[response.body.length - 1].likes === 0)
    })
    test('no post if no url or no title', () => {
      const newBlogNoTitle = {
        _id: "5a422b3a1b54a676234d17f9",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      }
      api.post('/api/blogs', newBlogNoTitle)
      .expect(400)
    })
    test('delete one', () => {
      api.delete('/api/blogs/5a422aa71b54a676234d17f8')
      .expect(204)
      
      
    })

})

afterAll(()=> {
    mongoose.connection.close()
})