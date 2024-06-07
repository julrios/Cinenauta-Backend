const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://julrios:HHQ9xsbP3RTiFwYZ@cinenautacluster.riignad.mongodb.net/?retryWrites=true&w=majority&appName=CinenautaCluster');
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
