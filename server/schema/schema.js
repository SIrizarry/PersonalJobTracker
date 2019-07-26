const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: String,
  logo: String,
  email: String,
  phone: String,
  jobs: Array,
  industry: String
});

const Company = mongoose.model('Company', companySchema);

const jobSchema = new Schema({
  title: String,
  description: String,
  company: String,
  compensation: String,
  status: {type: String, default: 'Interested'},
})

const Job = mongoose.model('Job', jobSchema);

module.exports = {
  Company: Company,
  Job: Job
}