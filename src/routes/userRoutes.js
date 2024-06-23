const { Router } = require("express");
const { check } = require("express-validator");
const userController = require('../controllers/userController');
const checkFields = require("../middlewares/validateFields");

const router = Router();

router.get("/", userController.getUsers); // Get Users

router.get("/:id", userController.getUserById); // Get User by id

router.get("/email/:email", userController.getUserByEmail); // Get User by email

router.get("/:id/lists", userController.getUserListsById); // Get User lists by id

router.post("/", // Create User
  [
    check("username").not().isEmpty(),
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
  ],
  userController.createUser
);

router.post("/login", // Login
  [
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
  ],
  userController.loginUser
);

module.exports = router;
