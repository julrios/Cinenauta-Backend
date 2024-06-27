const movieModel = require("../models/Movie");

class movieService {

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

  async createMovie(movie) {
    try {
      let savedMovie = await movieModel.create(movie);
      return savedMovie;
    } catch (err) {
      console.error(err);
      throw new Error("Error in createMovie Service");
    }
  }

  async updateMovie(id, fields, movie) {
    try {
      fields.id_movie ? movie.id_movie = fields.id_movie : false;
      fields.title ? movie.title = fields.title : false;
      fields.overview ? movie.overview = fields.overview : false;
      fields.release_date ? movie.release_date = fields.release_date : false;
      fields.poster_path ? movie.poster_path = fields.poster_path : false;

      await movieModel.findOneAndUpdate({_id: id}, movie);
      return movie;
    } catch (err) {
      console.error(err);
      throw new Error("Error in updateMovie Service");
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
