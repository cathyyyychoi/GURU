mongoose = require('mongoose');

postSchema = mongoose.Schema({
  title: {type:String, required:true},
  body: {type:String, required:true},
  createdAt: {type:Date, default:Date.now},
  updatedAt: {type:Date},
});

Post = mongoose.model('post', postSchema);
module.exports = Post;
