const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  // Create a root user
  await User.deleteMany({})

  // Create blogs without user
  await Blog.deleteMany({})
  const noteob = helper.initialBlogs
    .map(blog => new Blog(blog))
  const prom = noteob.map(blog => blog.save())
  await prom.all(prom)
})

describe('Get blog information', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const res = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${res.body.token}`
    }
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .set(headers)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const resp = await api
                        .get('/api/blogs')
                        .set(headers)

    expect(resp.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the first blog is about React patterns', async () => {
    const resp = await api
                      .get('/api/blogs')
                      .set(headers)

    const cont = resp.body.map(r => r.title)

    expect(cont).toContain('React patterns')
  })

  test('The unique identifier property of the blog posts is by default _id', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  })
})

describe('Addition of a new blog', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const res = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${res.body.token}`
    }
  })

  test('A valid blog can be added ', async () => {
    const newBlog = {
      title:"Canonical string reduction",
      author:"Edsger W. Dijkstra",
      url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .set(headers)
      .expect('Content-Type', /application\/json/)

    const blogen = await helper.blogsInDb()
    expect(blogen).toHaveLength(helper.initialBlogs.length + 1)

    const cont = blogen.map(n => n.title)
    expect(cont).toContain(
      'Canonical string reduction'
    )
  })

  test('If title and url are missing, respond with 400 bad request', async () => {
    const newBlog = {
      author:"Edsger W. Dijkstra",
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)

    const blogen = await helper.blogsInDb()

    expect(blogen).toHaveLength(helper.initialBlogs.length)
  })

  test('If the likes property is missing, it will default to 0 ', async () => {
    const newBlog = {
      title:"First class tests",
      author:"Robert C. Martin",
      url:"http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogen = await helper.blogsInDb()
    const addblog = await blogen.find(blog => blog.title === "First class tests")
    expect(addblog.likes).toBe(0)
  })
})

describe('Update a blog', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const res = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${res.body.token}`
    }
  })

  test('Blog update successful ', async () => {

    const newBlog = {
      title:"Masterpiece",
      author:"Edsger W. Dijkstra",
      url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(200)

    const all = await helper.blogsInDb()
    const blogupd = all.find(blog => blog.title === newBlog.title)

    const updblo = {
      ...blogupd,
      likes: blogupd.likes + 1
    }

    await api
      .put(`/api/blogs/${blogupd.id}`)
      .send(updblo)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogen = await helper.blogsInDb()
    expect(blogen).toHaveLength(helper.initialBlogs.length + 1)
    const found = blogen.find(blog => blog.likes === 13)
    expect(found.likes).toBe(13)
  })
})

describe('Deletion of a blog', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const res = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${res.body.token}`
    }
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const newBlog = {
      title:"The best blog ever",
      author:"Me",
      url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(200)

    const all = await helper.blogsInDb()
    const blogdele = all.find(blog => blog.title === newBlog.title)

    await api
      .delete(`/api/blogs/${blogdele.id}`)
      .set(headers)
      .expect(204)

    const blogen = await helper.blogsInDb()

    expect(blogen).toHaveLength(
      helper.initialBlogs.length
    )

    const cont = blogen.map(r => r.title)

    expect(cont).not.toContain(blogdele.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
