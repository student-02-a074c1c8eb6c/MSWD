const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const bloschema = mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
      },
    author: {
        type: String,
        required: true
      },
    url: {
        type: String,
        minlength: 3,
        required: true
      },
    likes: {
        type: Number
      },
    comments: [{
      type: String
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
  })


bloschema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
bloschema.plugin(uniqueValidator);

module.exports = mongoose.model('Blog', bloschema)
