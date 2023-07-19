const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MONGODB
mongoose.connect(process.env.MONGO_URI, () => {
	console.log('Connected to Database!');
});

app.use('/', indexRouter);

app.use((req,res,next)=>{
    const exception = new Error(`Path not found`);
    exception.statusCode = 404;
    next(exception)
})

app.use((err,req,res,next)=>{
    console.error(err)
    res.status(err.statusCode || 500).send(err.message);
})


module.exports = app;
