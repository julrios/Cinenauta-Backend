const { Router } = require("express");
const { check } = require("express-validator");
const listController = require('../controllers/listController');
const jwtValidator = require("../middlewares/jwtValidator");
const checkFields = require("../middlewares/validateFields");

const router = Router();

// Rutas protegidas por JWT Token

// Create List
router.post("/",
  [
    jwtValidator,
    check("list_name").not().isEmpty().withMessage("List name is required"),
    check("description").not().isEmpty().withMessage("List description is required"),
    checkFields,
  ],
  listController.createList
);

// Update List
router.put("/:id",
    [
      jwtValidator,
      check('list_name').not().isEmpty().withMessage('List name is required'),
      check('description').not().isEmpty().withMessage('List description is required'),
      checkFields,
    ],
    listController.updateList
  );

// Delete List
router.delete("/:id", jwtValidator, listController.deleteList);

// Add Movie to List
router.post("/:id/addMovie",
  [
    jwtValidator,
    check("listId").not().isEmpty().withMessage("List ID is required"),
    check("movieData").not().isEmpty().withMessage("Movie data is required"),
    checkFields,
  ],
  listController.addMovieToList
);

// Remove Movie from List
router.post("/:id/removeMovie",
  [
    jwtValidator,
    check("listID").not().isEmpty().withMessage("List ID is required"),
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
