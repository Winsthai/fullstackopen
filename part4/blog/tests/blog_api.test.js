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

    // Ensure no two blogs have the same id, must be unique
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
    
    // Get blog that was saved to database
    const savedBlog = response.body.filter(blog => blog.title === testBlog.title)[0]

    // Ensure its data is the same
    assert.strictEqual(savedBlog.title, testBlog.title)
    assert.strictEqual(savedBlog.author, testBlog.author)
    assert.strictEqual(savedBlog.url, testBlog.url)
    assert.strictEqual(savedBlog.likes, testBlog.likes)
})

test("verifies that if the likes property is missing from the request, it will default to the value 0", async () => {
    const testBlog = {
        title: "How to write a blog post: a step-by-step guide",
        author: "Cecilia Lazzaro Blasbalg",
        url: "https://www.wix.com/blog/how-to-write-a-blog-post-with-examples",
    }

    await api
        .post('/api/blogs')
        .send(testBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const testBlogSaved = response.body.filter(blog => blog.title === testBlog.title)[0]

    assert.strictEqual(testBlogSaved.likes, 0)
})

after(async () => {
    await mongoose.connection.close()
})