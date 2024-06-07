const express = require('express');
const { createList } = require('../controllers/listController');

const router = express.Router();

router.post('/', createList);

module.exports = router;
