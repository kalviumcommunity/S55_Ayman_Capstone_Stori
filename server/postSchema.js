
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    
  });
  
  const Post = mongoose.model('post', postSchema);

  module.exports = {Post};