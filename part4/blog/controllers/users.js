const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const userRouter = require('express').Router()


userRouter.get('/',async (request,response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

userRouter.post('/',async (request,response) => {
  const { username, name , password } = request.body

  if(password.length<3) {
    return response.status(400).json({ error : 'password is atleast 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(password,saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = userRouter