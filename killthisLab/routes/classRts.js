const express = require('express');
const router = express.Router();
const classController = require('../controller/classCtrl');

router.get('/classes', classController.getAllClass);
module.exports = router;
