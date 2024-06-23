const mongoose = require('mongoose');

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbOptions = process.env.DB_OPTIONS;
const dbName = process.env.DB_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbOptions}${dbName}`;

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log(`MongoDB connected`);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
