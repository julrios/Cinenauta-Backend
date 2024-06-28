const User = require('../models/User');
const List = require('../models/List');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class userService {

  async createUser({ username, email, password }) {
    try {
      const isUserRegistered = await User.findOne({email: email});
      if(isUserRegistered){
        throw new Error("User already registered");
      }
      else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password:hashedPassword });
        
        const vistasList = new List({ list_name: 'Vistas', description: 'Tus películas y series vistas.', user: user });
        const favoritasList = new List({ list_name: 'Favoritas', description: 'Tus películas y series favoritas.', user: user });
        const verDespuesList = new List({ list_name: 'Ver Despues', description: 'Tus películas y series para ver después.', user: user });

        await vistasList.save();
        await favoritasList.save();
        await verDespuesList.save();

        user.lists = [vistasList._id, favoritasList._id, verDespuesList._id];

        return await user.save();
      }
    } catch (err) {
      console.error(err);
      throw new Error("Error in createUser Service");
    }
  }

  async loginUser({ email, password }) {
    try {
      const user = await User.findOne({email: email});
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return null;
      }

      const payload = {
        user: {
          _id: user._id,
          username: user.username
        }
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  
      return token;
    } catch (err) {
      console.error(err);
      throw new Error("Error in login Service");
    }
  }

  async updateUser(id, newData) {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true });
      if (!updatedUser) {
        throw new Error('User not found');
      }
      return updatedUser;
    } catch (err) {
      console.error(err);
      throw new Error('Error in updateUser Service');
    }
  }

  async deleteUser(id) {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new Error('User not found');
      }
      return deletedUser;
    } catch (err) {
      console.error(err);
      throw new Error('Error in deleteUser Service');
    }
  }

  async getUserById(id) {
    try {
      return await User.findOne({_id: id});
    } catch (err) {
      console.error(err);
      throw new Error("Error in getUserById Service");
    }
  }

  async getUserListsById(id) {
    try {
      const user = await User.findOne({_id: id}).populate('lists');
      if (!user) {
        throw new Error('User not found');
      }
      return user.lists;
    } catch (err) {
      console.error(err);
      throw new Error('Error in getUserListsById Service');
    }
  }

  /*
  async getUsers() {
    try {
      return await User.find({});
    } catch (err) {
      console.error(err);
      throw new Error("Error in getUsers Service");
    }
  }

  async getUserByEmail(email) {
    try {
      return await User.findOne({email: email});
    } catch (err) {
      console.error(err);
      throw new Error("Error in getUserById Service");
    }
  }
  */
  
}

module.exports = new userService();
