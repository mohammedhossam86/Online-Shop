const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./db/connect');
dotenv.config();
const productsRouter = require('./routes/Products');
const app = express();
const port = 3000;

app.use(express.json());

// Serving static files & setting view engine 
app.use(express.static(path.join(__dirname, 'assets')));
app.set('view engine', 'ejs');
app.use('/', productsRouter);

const start = () => {
    connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
}

start();