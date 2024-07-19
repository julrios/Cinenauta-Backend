const User = require('../models/User');
const List = require('../models/List');
const Movie = require('../models/Movie');

class listService {

  async createList({ list_name, description, userId }) {
    try {
      let user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      let list = new List({ list_name, description, user, movies: [] });
      await list.save();

      user.lists.push(list);
      await user.save();

      return list;
    } catch (err) {
      console.error(err);
      throw new Error("Error en el Servicio createList");
    }
  }

  async updateList(id, newData) {
    try {
      let list = await List.findOne({_id: id});
      if (!list) {
        throw new Error('Lista no encontrada');
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
      throw new Error('Error en el Servicio updateList');
    }
  }

  async deleteList(id) {
    try {
      let list = await List.findOne({_id: id});
      if (!list) {
        throw new Error("Lista no encontrada");
      }
      //if (list.list_name === "Vistas" || list.list_name === "Favoritas" || list.list_name === "Ver Despues") {
      if (list.list_name === "favoritas" || list.list_name === "vistas" || list.list_name === "pendientes") {
        throw new Error("Esta lista no puede ser eliminada");
      }
      await List.findByIdAndDelete(id);

      let user = await User.findById(list.user);
      user.lists.pull(id);
      await user.save();

      return;
    } catch (err) {
      console.error(err);
      throw new Error("Error en el Servicio deleteList");
    }
  }

  async addMovieToList({ listId, movieData }) {
    try {
      let list = await List.findOne({_id: listId});
      if (!list) {
        throw new Error("Lista no encontrada");
      }

      let movie = await Movie.findOne({id_movie: movieData.id_movie});
      if (!movie) {
        movie = await movieService.createMovie({ movieData });
      }

      let movieAlreadyInList = list.movies.some(existingMovie => existingMovie.toString() === movie._id.toString());

      if (!movieAlreadyInList) {
        list.movies.push(movie._id);
        await list.save();
      }

      return list.populate('movies');
    } catch (err) {
      console.error(err);
      throw new Error("Error en el Servicio addMovieToList");
    }
  }

  async removeMovieFromList({ listId, id_movie }) {
    try {
      let list = await List.findOne({_id: listId});
      if (!list) {
        throw new Error("Lista no encontrada");
      }

      let movie = await Movie.findOne({id_movie: id_movie});
      if (!movie) {
        throw new Error("Película no encontrada");
      }

      const movieIndex = list.movies.indexOf(movie._id);
      if (movieIndex !== -1) {
        list.movies.splice(movieIndex, 1);
        await list.save();
      } else {
        throw new Error("La película no está en la lista");
      }

      return list.populate('movies');
    } catch (err) {
      console.error(err);
      throw new Error("Error en el Servicio removeMovieFromList");
    }
  }

  async getListById(id) {
    try {
      return await List.findOne({_id: id}).populate('movies');
    } catch (err) {
      console.error(err);
      throw new Error("Error en el Servicio getListById");
    }
  }

  async updateList(id, fields, list) {
    try {
      fields.list_name ? list.list_name = fields.list_name : false;

      await listModel.findOneAndUpdate({_id: id}, list);
      return list;
    } catch (err) {
      console.error(err);
      throw new Error("Error en el Servicio updateList");
    }
  }

  async getLists() {
    try {
      return await List.find({}).populate('movies');
    } catch (err) {
      console.error(err);
      throw new Error("Error en el Servicio getLists");
    }
  }

}

module.exports = new listService();
