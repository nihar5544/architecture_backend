const mongoose = require('mongoose');

const projectDetailsSchema = new mongoose.Schema({
  Client: String,
  Category: String,
  Location: String,
  Date: String,
  Link: String,
  title: String,
  description: String,
  image: String,
  otherImage: Array,
});

module.exports = mongoose.models.ProjectDetail || mongoose.model('ProjectDetail', projectDetailsSchema);
