const Movie = require('../models/Movie');

const createMovie = async (req, res) => {
    try {
        const { id_movie, title, overview, release_date, poster_path } = req.body;
        const movie = new Movie({ id_movie, title, overview, release_date, poster_path });
        await movie.save();
        res.status(201).json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createMovie };
