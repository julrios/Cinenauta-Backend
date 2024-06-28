const { Router } = require("express");
const { check } = require("express-validator");
const userController = require('../controllers/userController');
const jwtValidator = require("../middlewares/jwtValidator");
const checkFields = require("../middlewares/validateFields");

const router = Router();

// Rutas públicas

// Create User
router.post("/",
  [
    check("username").not().isEmpty().withMessage("Username is required"),
    check("email").not().isEmpty().withMessage("Email is required"),
    check("password").not().isEmpty().withMessage("Password is required"),
    checkFields,
  ],
  userController.createUser
);

// Login User
router.post("/login",
  [
    check("email").not().isEmpty().withMessage("Email is required"),
    check("password").not().isEmpty().withMessage("Password is required"),
    checkFields,
  ],
  userController.loginUser
);

// Rutas protegidas por JWT Token

// Logout User
router.post("/logout", jwtValidator, userController.logoutUser);

// Update User
router.put("/:id", jwtValidator, userController.updateUser);

// Delete User
router.delete("/:id", jwtValidator, userController.deleteUser);

// Get User by ID
router.get("/:id", jwtValidator, userController.getUserById);

// Get User lists by ID
router.get("/:id/lists", jwtValidator, userController.getUserListsById);

// Rutas no necesarias

// Get Users
// router.get("/", jwtValidator, userController.getUsers);

// Get User by email
// router.get("/email/:email", jwtValidator, userController.getUserByEmail);

module.exports = router;
