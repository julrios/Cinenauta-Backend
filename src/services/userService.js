const User = require('../models/User');
const List = require('../models/List');
const bcrypt = require('bcrypt');

class userService {

  async getUsers() {
    try {
      return await User.find({});
    } catch (err) {
      console.error(err);
      throw new Error("Error in getUsers Service");
    }
  }

  async getUserById(id) {
    try {
      return await User.findOne({_id:id});
    } catch (err) {
      console.error(err);
      throw new Error("Error in getUserById Service");
    }
  }

  async getUserByEmail(email) {
    try {
      return await User.findOne({email:email});
    } catch (err) {
      console.error(err);
      throw new Error("Error in getUserById Service");
    }
  }

  async getUserListsById(id) {
    try {
      const user = await User.findOne({_id:id}).populate('lists');
      if (!user) {
        throw new Error('User not found');
      }
      return user.lists;
    } catch (err) {
      console.error(err);
      throw new Error('Error in getUserListsById Service');
    }
  }

  async createUser({ username, email, password }) {
    try {
      const isUserRegistered = await User.findOne({email:email});
      if(isUserRegistered){
        throw new Error("User already registered");
      }
      else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password:hashedPassword });
        
        const vistasList = new List({ list_name: 'vistas' });
        const favoritasList = new List({ list_name: 'favoritas' });
        const verDespuesList = new List({ list_name: 'verDespues' });

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
      const user = await User.findOne({email:email});
      if (user && await bcrypt.compare(password, user.password)) {
        return user;
      }
      return null;
    } catch (err) {
      console.error(err);
      throw new Error("Error in login Service");
    }
  }
  
}

module.exports = new userService();
