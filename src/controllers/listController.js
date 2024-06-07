const List = require('../models/List');

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

module.exports = { createList };
