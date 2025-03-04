const mongoose = require('mongoose')
const User = require('./models/user')
require('dotenv').config()


const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery', false)

console.log('Connecting to database')

mongoose.connect(url)
  .then( () => {
    console.log('connected successfully')
  })
  .catch(error => [
    console.log(error)
  ])



const user = new User({
  username : 'kuldeep',
  name : 'parmar',
  passwordHash : 'parmar',
  blogs : []
})

user.save()
  .then(result => {
    console.log(result)
    mongoose.connection.close()
  })
  .catch(error => {
    console.log(error)
  })