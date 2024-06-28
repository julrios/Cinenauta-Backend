const User = require('../models/User');
const List = require('../models/List');
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
        
        let vistasList = new List({ list_name: 'Vistas', description: 'Tus películas y series vistas.', user: user });
        let favoritasList = new List({ list_name: 'Favoritas', description: 'Tus películas y series favoritas.', user: user });
        let verDespuesList = new List({ list_name: 'Ver Despues', description: 'Tus películas y series para ver después.', user: user });

        await vistasList.save();
        await favoritasList.save();
        await verDespuesList.save();

        user.lists = [vistasList._id, favoritasList._id, verDespuesList._id];

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
      let user = await User.findOne({_id: id}).populate('lists');
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      
      return user.lists;
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
