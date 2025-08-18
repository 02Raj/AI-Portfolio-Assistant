const express = require('express');
const router = express.Router();
const { askAI } = require('../controller/askAiController');

router.post('/ask', askAI);

module.exports = router;
