const User = require('../models/User');
const List = require('../models/List');

class listService {

  async getLists() {
    try {
      return await List.find({});
    } catch (err) {
      console.error(err);
      throw new Error("Error in getLists Service");
    }
  }

  async getListById(id) {
    try {
      return await List.findOne({_id: id});
    } catch (err) {
      console.error(err);
      throw new Error("Error in getListById Service");
    }
  }
/*
  async createList(list) {
    try {
      let savedList = await listModel.create(list);
      return savedList;
    } catch (err) {
      console.error(err);
      throw new Error("Error in createList Service");
    }
  }

  async addMovieToList(list, movie) {
    try {
      let savedList = await listModel.create(list);
      return savedList;
    } catch (err) {
      console.error(err);
      throw new Error("Error in addMovieToList Service");
    }
  }

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

  async deleteList(id) {
    try {
      await listModel.findOneAndDelete({_id: id});
    } catch (err) {
      console.error(err);
      throw new Error("Error in deleteList Service");
    }
  }
*/
}

module.exports = new listService();
