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
    check("list_name").not().isEmpty().withMessage("Se requiere nombre de Lista"),
    check("description").not().isEmpty().withMessage("Se requiere descripción de Lista"),
    checkFields,
  ],
  listController.createList
);

// Update List
router.put("/:id",
    [
      jwtValidator,
      check('list_name').not().isEmpty().withMessage('Se requiere nombre de Lista'),
      check('description').not().isEmpty().withMessage('Se requiere descripción de Lista'),
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
    check("listId").not().isEmpty().withMessage("Se requiere ID de Lista"),
    check("id_movie").not().isEmpty().withMessage("Se requiere ID de Película"),
    check("title").not().isEmpty().withMessage("Se requiere título de Película"),
    check("poster_path").not().isEmpty().withMessage("Se requiere ubicación de poster de Película"),
    checkFields,
  ],
  listController.addMovieToList
);

// Remove Movie from List
router.post("/:id/removeMovie",
  [
    jwtValidator,
    check("listId").not().isEmpty().withMessage("Se requiere ID de Lista"),
    check("id_movie").not().isEmpty().withMessage("Se requiere ID de Película"),
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
