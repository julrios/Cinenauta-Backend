const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    id_movie: { type: String, required: true },
    title: { type: String, required: true },
    overview: { type: String },
    release_date: { type: String },
    poster_path: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema);
