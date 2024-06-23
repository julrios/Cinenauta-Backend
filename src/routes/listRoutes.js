const { Router } = require("express");
const { check } = require("express-validator");
const listController = require('../controllers/listController');
const checkFields = require("../middlewares/validateFields");

const router = Router();

router.get("/", listController.getLists); // Get Lists

router.get("/:id", listController.getListById); // Get List by id

module.exports = router;
