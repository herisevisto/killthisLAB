const LabClass = require('../model/class');
const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const classJson = path.join(__dirname, '../model/classData.json'); 

exports.getAllClass = (req, res) => {
  fs.readFile(classJson, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading classes JSON file:', err);
          res.status(500).json({ error: 'Failed to read classes data' });
          return;
      }
      
      const classes = JSON.parse(data);
      res.json(classes);
  });
};


exports.getSelectedClass = (classID, callback) => {
  fs.readFile(classJson, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading classes JSON file:', err);
          callback('Failed to read classes data', null);
          return;
      }

      const classes = JSON.parse(data);
      const selectedClass = classes.find(cls => cls.classID === classID);

      if (!selectedClass) {
          callback(`Class with ID ${classID} not found`, null);
          console.error('Error reading classes JSON file:', err);
          return;
      }

      callback(null, selectedClass);
  });
};