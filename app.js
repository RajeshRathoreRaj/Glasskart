var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')
var indexRouter = require('./routes/index');
var storesRouter = require('./routes/stores');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var categoriesRouter = require('./routes/categories');
var colorRouter = require('./routes/color');
var materialRouter = require('./routes/material');
var frametypesRouter = require('./routes/frametypes');
var priceRouter = require('./routes/price');
var shapesRouter = require('./routes/shapes');
var finalproductRouter = require('./routes/finalproduct');
var productRouter = require('./routes/product');
var mainpageRouter = require('./routes/mainpage');
var userDetailsRouter = require('./routes/userdetails');
var sendsmsRouter = require('./routes/smsapi');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stores',storesRouter)
app.use('/admin',adminRouter)
app.use('/categories',categoriesRouter)
app.use('/frametypes',frametypesRouter)
app.use('/color',colorRouter)
app.use('/material',materialRouter)
app.use('/price',priceRouter)
app.use('/shapes',shapesRouter)
app.use('/finalproduct',finalproductRouter)
app.use('/product',productRouter)
app.use('/mainpage',mainpageRouter)
app.use('/userdetails',userDetailsRouter)
app.use('/sendsms',sendsmsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
