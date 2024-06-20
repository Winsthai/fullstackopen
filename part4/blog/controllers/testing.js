const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// HTTP POST to /api/testing/reset in testing mode should empty the database
router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router