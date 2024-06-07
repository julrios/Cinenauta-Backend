const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    list_name: { type: String, required: true },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
}, { timestamps: true });

module.exports = mongoose.model('List', ListSchema);
