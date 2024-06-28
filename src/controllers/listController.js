const listService = require('../services/listService');

const createList = async (req, res) => {
  try {
      const { list_name, description, user } = req.body;
      const userObj = req.user;
      const list = await listService.createList(list_name, description, userObj._id);
      res.status(201).json(list);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

const deleteListById = async (req, res) => {
  try {
      const { id } = req.params;
      await listService.deleteListById(id);
      res.status(200).json({ message: 'List deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

const addMovieToList = async (req, res) => {
  try {
    const { listId, movieData } = req.body;
    const list = await listService.addMovieToList(listId, movieData);
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeMovieFromList = async (req, res) => {
  try {
    const { listId, movieId } = req.body;
    const list = await listService.removeMovieFromList(listId, movieId);
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getListById = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await listService.getListById(id);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*
const getLists = async (req, res) => {
  try {
    const lists = await listService.getLists();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/

module.exports = {
  createList,
  deleteListById,
  addMovieToList,
  removeMovieFromList,
  getListById,
};
