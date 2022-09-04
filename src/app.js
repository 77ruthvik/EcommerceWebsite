//https://www.youtube.com/watch?v=VxRXlUrV6y0&list=PLg1Wa1ZpMJpbYbUqyCmpBYTxjS7Zxqu0C&index=4
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//npm run dev


//importing routes
const customerRoutes = require('./routes/customer');
const { urlencoded } = require('express');

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    port: 3307,
    database: 'ecommerce'
}, 'single'));

app.use(express.urlencoded({extended: false}));

//routes
app.use('/', customerRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
})
