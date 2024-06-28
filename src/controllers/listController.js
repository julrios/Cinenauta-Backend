const listService = require('../services/listService');

const createList = async (req, res) => {
  try {
      const { list_name, description } = req.body;
      const userId = req.user._id;
      const list = await listService.createList({ list_name, description, userId });
      res.status(201).json(list);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedList = await listService.updateList(id, newData);
    res.status(200).json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteList = async (req, res) => {
  try {
      const { id } = req.params;
      await listService.deleteList(id);
      res.status(200).json({ message: 'List deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

const addMovieToList = async (req, res) => {
  try {
    const { listId, id_movie, title, overview, release_date, poster_path } = req.body;
    const movieData = { id_movie, title, overview, release_date, poster_path };
    const list = await listService.addMovieToList({ listId, movieData });
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeMovieFromList = async (req, res) => {
  try {
    const { listId, movieId } = req.body;
    const list = await listService.removeMovieFromList({ listId, movieId });
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
  updateList,
  deleteList,
  addMovieToList,
  removeMovieFromList,
  getListById,
};
