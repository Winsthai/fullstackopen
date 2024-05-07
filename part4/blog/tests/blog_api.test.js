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
})

after(async () => {
    await mongoose.connection.close()
})