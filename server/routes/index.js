const log = require('electron-log');
log.transports.console.level = 'info';
log.transports.file.level = 'info';

const express = require('express');
const mongoose = require('mongoose');
const models = require('../schema/schema');
const Job = models.Job;
const Company = models.Company;

exports.getJobs = function( req, res ) {
  Job.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('Could not retrieve Job list');
    })
};

exports.addJob = function( req, res ) {
  const saveObject = new Job(req.query);
  saveObject.save()
    .then(item => {
      res.send("Job saved to database");
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("Unable to save Job to database");
    })
};

exports.getCompanies = function( req, res ) {
  Company.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('Could not retrive Company list');
    })
};

exports.addCompany = function( req, res ) {
  const saveObject = new Company(req.query);
  saveObject.save()
    .then(item => {
      res.send("Company saved to database");
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("Unable to save company to database");
    })
};