const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./db/connect');
const bodyParser = require('body-parser');
dotenv.config();
const homeRouter = require('./routes/homeRouter');
const productsRouter = require('./routes/productsRouter');
const authRouter = require('./routes/authRouter');
const cartRouter = require('./routes/cartRouter')
const orderRouter = require('./routes/orderRouter')
const app = express();
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const attachUser = require('./middlewares/attachUser');

bodyParser.urlencoded({ extended: false });
const port = 3000;
app.use(express.static('public'));


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(attachUser);

app.use(bodyParser.urlencoded({ extended: true }));

// Serving static files & setting view engine 
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.set('view engine', 'ejs');
app.use(flash());
app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/products', productsRouter);
app.use('/cart' , cartRouter)
app.use('/orders' , orderRouter)

const start = async () => {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
}

start();