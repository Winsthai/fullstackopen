const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

describe("when there are initially some users saved", () => {
    // Before each test, clear the database, then add all users from initialUsers back to it
    beforeEach(async () => {
        await User.deleteMany({})
        const users = helper.initialUsers.map(user => new User(user))
        const promiseArray = users.map(user => user.save())
        await Promise.all(promiseArray)
    })

    describe("addition of a new user", () => {
        test("a user is created successfully", async () => {
            const currentUsers = await helper.usersInDb()

            const testUser = {
                username: "johnblue",
                name: "Johnny Blue",
                password: "blueygreen20"
            }

            await api
                .post('/api/users')
                .send(testUser)
                .expect(201)

            const usersAfterTest = await helper.usersInDb()

            assert.strictEqual(usersAfterTest.length, currentUsers.length + 1)

            const newUser = usersAfterTest.filter(user => user.username === testUser.username)[0]

            assert.strictEqual(newUser.username, testUser.username)
            assert.strictEqual(newUser.name, testUser.name)
        })

        test("an error is thrown when an invalid user is added with a username that is too short", async () => {
            const currentUsers = await helper.usersInDb()

            const testUser = {
                username: "he",
                name: "Arto Hellas",
                password: "passwordpassword123"
            }

            await api
                .post('/api/users')
                .send(testUser)
                .expect(400)

            const usersAfterTest = await helper.usersInDb()

            assert.strictEqual(usersAfterTest.length, currentUsers.length)
        })

        test("an error is thrown when an invalid user is added with a password that is too short", async () => {
            const currentUsers = await helper.usersInDb()

            const testUser = {
                username: "fellas",
                name: "Arto Hellas",
                password: "pa"
            }

            await api
                .post('/api/users')
                .send(testUser)
                .expect(400)

            const usersAfterTest = await helper.usersInDb()

            assert.strictEqual(usersAfterTest.length, currentUsers.length)
        })

        test("an error is thrown when an invalid user is added with a username that already exists in database", async () => {
            const currentUsers = await helper.usersInDb()

            const testUser = {
                username: "hellas",
                name: "Arto Hellas",
                password: "passwordpassword123"
            }

            await api
                .post('/api/users')
                .send(testUser)
                .expect(400)

            const usersAfterTest = await helper.usersInDb()

            assert.strictEqual(usersAfterTest.length, currentUsers.length)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})