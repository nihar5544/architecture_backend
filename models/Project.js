const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  imageUrl: String,
  title: String,
  date: Date
});

module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);
