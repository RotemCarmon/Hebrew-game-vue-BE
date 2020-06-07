const express = require('express');
const { getInfinitives, getConjugation } = require('./verb.controller');

const router = express.Router()
router.get('/', getInfinitives)
router.get('/conjugation', getConjugation)

module.exports = router