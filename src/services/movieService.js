const movieModel = require("../models/Movie");

class movieService {

  async createMovie({ movieData }) {
    try {
      if (!movieData || !movieData.id_movie) {
        throw new Error("Datos de la Película inválidos");
      }

      let movie = await Movie.findOne({ id_movie: movieData.id_movie });
      if (!movie) {
        movie = new Movie({
          id_movie: movieData.id_movie,
          title: movieData.title,
          overview: movieData.overview,
          release_date: movieData.release_date,
          poster_path: movieData.poster_path,
        });
        await movie.save();
      } else {
        throw new Error("La película ya existe");
      }

      return movie;
    } catch (err) {
      console.error(err);
      throw new Error("Error en el Servicio createMovie");
    }
  }

  async getMovies() {
    try {
      let movies = await movieModel.find({});
      return movies;
    } catch (err) {
      console.error(err);
      throw new Error("Error en el Servicio getMovies");
    }
  }

  async getMovieById(id) {
    try {
      let movie = await movieModel.findOne({_id: id});
      return movie;
    } catch (err) {
      console.error(err);
      throw new Error("Error en el Servicio getMovieById");
    }
  }

  async getMoviesByTitle(title) {
    try {
      let movie = await movieModel.find({ title: title });
      return movie;
    } catch (err) {
      console.error(err);
      throw new Error("Error en el Servicio getMoviesByCategory");
    }
  }

}

module.exports = new movieService();
