const express = require('express');
const connectDB = require('./src/config/db');

const app = express();
connectDB();
app.use(express.json());

app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/lists', require('./src/routes/listRoutes'));
app.use('/api/movies', require('./src/routes/movieRoutes'));

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
