const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const usrschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  name: String,
  pwdH: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

usrschema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the pwdH should not be revealed
    delete returnedObject.pwdH
  }
})

usrschema.plugin(uniqueValidator)

module.exports = mongoose.model('User', usrschema)
