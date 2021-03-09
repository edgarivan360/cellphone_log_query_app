const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');

// Initializations
const app = express();
dotenv.config({
    path: path.join(__dirname, '.env')
});
require('./database');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, process.env.VIEWS_DIR || 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: path.join(app.get('views'), process.env.LAYOUTS_DIR || 'layouts'),
    partialsDir: path.join(app.get('views'), process.env.PARTIALS_DIR || 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({
    extended: false
}));

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/bitacora'));

// Static files
app.use(express.static(path.join(__dirname, process.env.PUBLIC_DIR || 'public')));

// Server start
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});