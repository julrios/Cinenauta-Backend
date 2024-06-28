const movieModel = require("../models/Movie");

class movieService {

  async createMovie({ movieData }) {
    try {
      if (!movieData || !movieData.id_movie) {
        throw new Error("Invalid movie data");
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
      }

      return movie;
    } catch (err) {
      console.error(err);
      throw new Error("Error in createMovie Service");
    }
  }

  async getMovies() {
    try {
      let movies = await movieModel.find();
      return movies;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getMovies Service");
    }
  }

  async getMovieById(id) {
    try {
      let movie = await movieModel.findOne({_id: id});
      return movie;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getMovieById Service");
    }
  }

  async getMoviesByTitle(title) {
    try {
      let movie = await movieModel.find({ title: title });
      return movie;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getMoviesByCategory Service");
    }
  }

  async deleteMovie(id) {
    try {
      await movieModel.findOneAndDelete({_id: id});
    } catch (err) {
      console.error(err);
      throw new Error("Error in deleteMovie Service");
    }
  }

}

module.exports = new movieService();

const Movie = require('../models/Movie');
