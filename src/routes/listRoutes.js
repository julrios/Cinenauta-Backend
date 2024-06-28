const { Router } = require("express");
const { check } = require("express-validator");
const listController = require('../controllers/listController');
const jwtValidator = require("../middlewares/jwtValidator");
const checkFields = require("../middlewares/validateFields");

const router = Router();

// Rutas protegidas por JWT Token

router.post("/", // Create List
  [
    jwtValidator,
    check("list_name").not().isEmpty().withMessage("List name is required"),
    check("description").not().isEmpty().withMessage("List description is required"),
    check("user").not().isEmpty().withMessage("User ID is required"),
    checkFields,
  ],
  listController.createList
);

router.delete("/:id", jwtValidator, listController.deleteListById); // Delete List

router.post("/addMovie", // Add Movie to List
  [
    jwtValidator,
    check("listId").not().isEmpty().withMessage("List ID is required"),
    check("movieData").not().isEmpty().withMessage("Movie data is required"),
    checkFields,
  ],
  listController.addMovieToList
);

router.post("/removeMovie", // Remove Movie from List
  [
    jwtValidator,
    check("listId").not().isEmpty().withMessage("List ID is required"),
    check("movieId").not().isEmpty().withMessage("Movie ID is required"),
    checkFields,
  ],
  listController.removeMovieFromList
);

// Get List by ID
router.get("/:id", jwtValidator, listController.getListById);

// Rutas no necesarias

// Get Lists
// router.get("/", listController.getLists);

module.exports = router;
