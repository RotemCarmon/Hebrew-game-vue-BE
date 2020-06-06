const express = require('express');
const { getVerbs } = require('./verb.controller');

const router = express.Router()
router.get('/', getVerbs)

module.exports = router