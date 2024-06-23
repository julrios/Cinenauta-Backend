const listService = require('../services/listService');

const getLists = async (req, res) => {
  try {
    const lists = await listService.getLists();
    res.status(200).json(lists);
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
const createList = async (req, res) => {
    try {
        const { list_name, movies } = req.body;
        const list = new List({ list_name, movies });
        await list.save();
        res.status(201).json(list);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
*/
module.exports = {
  getLists,
  getListById
};
