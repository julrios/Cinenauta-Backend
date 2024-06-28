const movieService = require('../services/movieService');

const createMovie = async (req, res) => {
  try {
    const { id_movie, title, overview, release_date, poster_path } = req.body;
    const movieData = { id_movie, title, overview, release_date, poster_path };
    const movie = await movieService.createMovie({ movieData });
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await movieService.getMovies();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieService.getMovieById(id);
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMoviesByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const movies = await movieService.getMoviesByTitle(title);
    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: "Películas no encontradas" });
    }
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMovie,
  getMovies,
  getMovieById,
  getMoviesByTitle,
};
