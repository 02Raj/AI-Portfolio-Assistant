const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  summary: String,
  skills: [String],
  projects: [{ name: String, description: String }],
  work: [{ company: String, role: String, duration: String }],
  education: String,
  softSkills: [String],
  careerGoals: String
}, { collection: 'resumes' });

module.exports = mongoose.model('Resume', resumeSchema);
