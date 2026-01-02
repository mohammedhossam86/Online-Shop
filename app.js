const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./db/connect');
const bodyParser = require('body-parser');
dotenv.config();
const homeRouter = require('./routes/homeRouter');
const productsRouter = require('./routes/productsRouter');
const authRouter = require('./routes/authRouter');
const app = express();
const cookieParser = require('cookie-parser')
bodyParser.urlencoded({ extended: false });
const port = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: true }));

// Serving static files & setting view engine 
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.set('view engine', 'ejs');
app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/products', productsRouter);

const start = () => {
    connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
}

start();