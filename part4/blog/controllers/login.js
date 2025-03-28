const loginRoute = require('express').Router()
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')

loginRoute.post('/',async (request,response) => {
  const { username , password } = request.body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcryptjs.compare(password,user.passwordHash)

  if(!(user || passwordCorrect)) {
    return response.status(401).json({
      error : 'invalid username or password'
    })
  }

  const userForToken = {
    username : user.username,
    id : user._id
  }

  const token = jwt.sign(userForToken,process.env.SECRET,{ expiresIn : 60*15 })

  response
    .status(200)
    .json({ token,username : user.username , name : user.name })

})

module.exports = loginRoute