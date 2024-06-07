const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    id_movie: { type: String, required: true },
    title: { type: String, required: true },
    overview: { type: String, required: true },
    release_date: { type: Date, required: true },
    poster_path: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema);
