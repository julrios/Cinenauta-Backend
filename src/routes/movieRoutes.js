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
    check("id_movie").not().isEmpty().withMessage("Movie TMDB ID is required"),
    check("title").not().isEmpty().withMessage("Movie title is required"),
    check("poster_path").not().isEmpty().withMessage("Movie poster path is required"),
    checkFields,
  ],
  movieController.createMovie
);

// Rutas no necesarias

// Get Movies
router.get("/", jwtValidator, movieController.getMovies);

module.exports = router;
