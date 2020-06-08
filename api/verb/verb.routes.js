const express = require('express');
const { getInfinitives, getConjugation, addVerb } = require('./verb.controller');

const router = express.Router()
router.get('/', getInfinitives)
router.get('/conjugation', getConjugation)
router.post('/add', addVerb)

module.exports = router