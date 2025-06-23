const mongoose = require('mongoose');
const { create } = require('./User');

const ProjectSchema=new mongoose.Schema({
  title:String,
  description:String,
  github:String,
  demo:String,
  techStack:[String],
  image:String,
  createdAt:{
    type:Date,
    default: Date.now,
  },
});

module.exports=mongoose.model('Project',ProjectSchema);