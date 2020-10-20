const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
    title: {
        type: String,
        
    },
    author: String,
    url: {
        type: String,
        
    },
    likes: Number
  })

  blogSchema.set('toJSON', {
      transform: (document, returnedObject) => {
          returnedObject.id = returnedObject._id.toString()
          delete returnedObject._id
          delete returnedObject.__v
          if(!returnedObject.likes) {
              returnedObject.likes = 0;
          }
      }
  })



  
  module.exports = mongoose.model('Blog', blogSchema)

