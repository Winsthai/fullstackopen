const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

// Before each test, clear the database, then add all blogs from initialBlogs back to it
beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogs.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('returns correct amount of blogs in JSON format', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test("verifies that the unique identifier property of the blog posts is named id", async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => assert(blog.hasOwnProperty("id")))

    const ids = new Set()
    const duplicates = false
    response.body.forEach(blog => ids.has(blog.id) ? duplicates = true : ids.add(blog.id))
    assert.strictEqual(duplicates, false)
})

test("creates a new blog post successfully", async () => {
    const testBlog = {
        title: "How to write a blog post: a step-by-step guide",
        author: "Cecilia Lazzaro Blasbalg",
        url: "https://www.wix.com/blog/how-to-write-a-blog-post-with-examples",
        likes: 27,
    }

    await api
        .post('/api/blogs')
        .send(testBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    
    const titles = response.body.map(blog => blog.title)
    const authors = response.body.map(blog => blog.author)
    const urls = response.body.map(blog => blog.url)
    const likesList = response.body.map(blog => blog.likes)

    assert(titles.includes("How to write a blog post: a step-by-step guide"))
    assert(authors.includes("Cecilia Lazzaro Blasbalg"))
    assert(urls.includes("https://www.wix.com/blog/how-to-write-a-blog-post-with-examples"))
    assert(likesList.includes(27))
})

after(async () => {
    await mongoose.connection.close()
})