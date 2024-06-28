const { Router } = require("express")
const { check } = require("express-validator");
const movieController = require('../controllers/movieController');
const jwtValidator = require("../middlewares/jwtValidator");
const checkFields = require("../middlewares/validateFields");

const router = Router();

// Rutas protegidas por JWT Token

// Create Movie
router.post("/",
  [
    jwtValidator,
    check("id_movie").not().isEmpty().withMessage("Se requiere el ID de TMDB de la Película"),
    check("title").not().isEmpty().withMessage("Se requiere el título de la Película"),
    check("poster_path").not().isEmpty().withMessage("Se requiere la ubicación del poster de la Película"),
    checkFields,
  ],
  movieController.createMovie
);

// Rutas no necesarias

// Get Movies
router.get("/", jwtValidator, movieController.getMovies);

module.exports = router;
