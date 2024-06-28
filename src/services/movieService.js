const movieModel = require("../models/Movie");

class movieService {

  async createMovie({ movieData }) {
    try {
      const movie = await Movie.findOne({ id_movie: movieData.id_movie });
      if (!movie) {
        const movie = new Movie(movieData);
        await movie.save();
        return movie;
      }

      return movie;
    } catch (err) {
      console.error(err);
      throw new Error("Error in createMovie Service");
    }
  }

  async getMovies() {
    try {
      const movies = await movieModel.find();
      return movies;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getMovies Service");
    }
  }

  async getMovieById(id) {
    try {
      const movie = await movieModel.findOne({_id: id});
      return movie;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getMovieById Service");
    }
  }

  async getMoviesByTitle(title) {
    try {
      const movie = await movieModel.find({ title: title });
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
