const mongoose = require('mongoose')

mongoose.set('strict',false);

const url = process.env.MONGODB_URI

console.log('Connecting to MongoDB',url)

mongoose.connect(url)
.then(result => {
    console.log('connected to MongoDB')
})
.catch(error => {
    console.log('erorr while connecting ', error.message)
})

const personSchema = new mongoose.Schema({
    name : {
        type : String,
        minLength : 3,
        required : true
    },
    number : {
        type : String,
        validate : {
            validator : function (v) {
                return /^\d{2,3}-\d+$/.test(v) && v.length >= 8;
            },
            message : props => `${props.value} is not a valid phone number !!`
        }
    }
})

personSchema.set('toJSON',{
    transform : (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person',personSchema)