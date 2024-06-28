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

module.exports = {
    createMovie,
    getMovies
};
