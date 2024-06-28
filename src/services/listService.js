const User = require('../models/User');
const List = require('../models/List');
const movieService = require('../services/movieService');

class listService {

  async createList({ list_name, description, userId }) {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error('User not found');
      }

      const list = new List({ list_name, description, user, movies: [] });
      await list.save();

      user.lists.push(list);
      await user.save();

      return list;
    } catch (err) {
      console.error(err);
      throw new Error("Error in createList Service");
    }
  }

  async updateList(id, newData) {
    try {
      const list = await List.findOne({_id: id});
      if (!list) {
        throw new Error('List not found');
      }

      if (newData.list_name) {
        list.list_name = newData.list_name;
      }

      if (newData.description) {
        list.description = newData.description;
      }

      await list.save();
      return list;
    } catch (err) {
      console.error(err);
      throw new Error('Error in updateList Service');
    }
  }

  async deleteList(id) {
    try {
      const list = await List.findOne({_id: id});
      if (!list) {
        throw new Error("List not found");
      }
      if (list.list_name === "Vistas" || list.list_name === "Favoritas" || list.list_name === "Ver Despues") {
        throw new Error("This list cannot be deleted");
      }
      await List.findByIdAndDelete(id);

      const user = await User.findById(list.user);
      user.lists.pull(id);
      await user.save();

      return;
    } catch (err) {
      console.error(err);
      throw new Error("Error in deleteList Service");
    }
  }

  async addMovieToList({ listId, movieData }) {
    try {
      const list = await List.findOne({_id: listId});
      if (!list) {
        throw new Error("List not found");
      }

      const movie = await List.findOne({_id: movieData.listId});
      if (!movie) {
        movie = await movieService.createMovie(movieData);
      }

      if (!list.movies.includes(movie)) {
        list.movies.push(movie._id);
        await list.save();
      }

      return list.populate('movies');
    } catch (err) {
      console.error(err);
      throw new Error("Error in addMovieToList Service");
    }
  }

  async removeMovieFromList({ listId, movieId }) {
    try {
      const list = await List.findOne({_id: listId});
      if (!list) {
        throw new Error("List not found");
      }

      const movie = await List.findOne({_id: movieId});
      if (!movie) {
        throw new Error("Movie not found");
      }

      if (list.movies.includes(movie)) {
        list.movies.push(movie._id);
        await list.save();
      }

      /*
      const movieIndex = list.movies.indexOf(movieId);
      if (movieIndex > -1) {
        list.movies.splice(movieIndex, 1);
        await list.save();
      }
      */

      list.movies.pull(movieId);
      await list.save();

      return list.populate('movies');
    } catch (err) {
      console.error(err);
      throw new Error("Error in removeMovieFromList Service");
    }
  }

  async getListById(id) {
    try {
      return await List.findOne({_id: id}).populate('movies');
    } catch (err) {
      console.error(err);
      throw new Error("Error in getListById Service");
    }
  }

  /*
  async updateList(id, fields, list) {
    try {
      fields.list_name ? list.list_name = fields.list_name : false;

      await listModel.findOneAndUpdate({_id: id}, list);
      return list;
    } catch (err) {
      console.error(err);
      throw new Error("Error in updateList Service");
    }
  }

  async getLists() {
    try {
      return await List.find({}).populate('movies');
    } catch (err) {
      console.error(err);
      throw new Error("Error in getLists Service");
    }
  }
  */

}

module.exports = new listService();
