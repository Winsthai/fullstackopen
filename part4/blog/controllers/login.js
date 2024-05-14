const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    // If user does not exist, don't check for password
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!user || !passwordCorrect) {
        console.log("test")
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    // Create a token, contains username, user id, and digital signature
    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({
        token, username: user.username, name: user.name
    })
})

module.exports = loginRouter