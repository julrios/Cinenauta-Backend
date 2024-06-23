require('dotenv').config();
const express = require('express');
const connectDB = require('./src/db/config');

const app = express();
connectDB();
app.use(express.json());

app.use('/users', require('./src/routes/userRoutes'));
app.use('/lists', require('./src/routes/listRoutes'));
app.use('/movies', require('./src/routes/movieRoutes'));

app.get('/', (req, res) => {
    res.send(`Server running`);
});

app.listen(process.env.PORT, () =>{
    console.log(`Server running on port ` + process.env.PORT);
})
