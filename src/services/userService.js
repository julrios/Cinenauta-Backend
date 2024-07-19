const User = require('../models/User');
const List = require('../models/List');
const Movie = require('../models/Movie');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class userService {

  async createUser({ username, email, password }) {
    try {
      let isUserRegistered = await User.findOne({email: email});
      if(isUserRegistered){
        throw new Error("El usuario ya está registrado");
      }
      else {
        let hashedPassword = await bcrypt.hash(password, 10);
        let user = new User({ username, email, password: hashedPassword, lists: [] });
        
        let favoritasList = new List({ list_name: 'favoritas', description: 'Tus películas y series favoritas.', user: user });
        let vistasList = new List({ list_name: 'vistas', description: 'Tus películas y series vistas.', user: user });
        //let verDespuesList = new List({ list_name: 'Ver Despues', description: 'Tus películas y series para ver después.', user: user });
        let pendientesList = new List({ list_name: 'pendientes', description: 'Tus películas y series por ver.', user: user });

        await favoritasList.save();
        await vistasList.save();
        //await verDespuesList.save();
        await pendientesList.save();

        user.lists = [favoritasList._id, vistasList._id, /*verDespuesList._id,*/ pendientesList._id];

        await user.save();
        return user.populate('lists');
      }
    } catch (err) {
      console.error("Error en el Servicio createUser: ", err);
      throw new Error(err);
    }
  }

  async loginUser({ email, password }) {
    try {
      let user = await User.findOne({email: email});
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return { token: null, username: null };
      }

      let payload = {
        user: {
          _id: user._id,
          username: user.username
        }
      };
      let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  
      return {token: token, id: user._id, username: user.username};
    } catch (err) {
      console.error("Error en el Servicio loginUser: ", err);
      throw new Error(err);
    }
  }

  async updateUser(id, newData) {
    try {
      let updatedUser = await User.findByIdAndUpdate(id, newData, { new: true });
      if (!updatedUser) {
        throw new Error('Usuario no encontrado');
      }
      return updatedUser;
    } catch (err) {
      console.error("Error en el Servicio updateUser: ", err);
      throw new Error(err);
    }
  }

  async deleteUser(id) {
    try {
      let deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new Error('Usuario no encontrado');
      }
      return deletedUser;
    } catch (err) {
      console.error("Error en el Servicio deleteUser: ", err);
      throw new Error(err);
    }
  }

  async getUserById(id) {
    try {
      return await User.findOne({_id: id});
    } catch (err) {
      console.error("Error en el Servicio getUserById: ", err);
      throw new Error(err);
    }
  }

  async getUserListsById(id) {
    try {
      let user = await User.findOne({ _id: id }).populate('lists');
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
  
      let listsWithMovies = {};
      for (const list of user.lists) {
        const movies = await Movie.find({ '_id': { $in: list.movies } });
        listsWithMovies[list.list_name] = {
          description: list.description,
          content: movies
        };
      }
  
      return listsWithMovies;
    } catch (err) {
      console.error("Error en el Servicio getUserListsById: ", err);
      throw new Error(err);
    }
  }

  async getUsers() {
    try {
      return await User.find({}).populate('lists');
    } catch (err) {
      console.error("Error en el Servicio getUsers: ", err);
      throw new Error(err);
    }
  }

  async getUserByEmail(email) {
    try {
      return await User.findOne({email: email});
    } catch (err) {
      console.error("Error en el Servicio getUserById: ", err);
      throw new Error(err);
    }
  }
  
}

module.exports = new userService();
