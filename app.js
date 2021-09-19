const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose =  require('mongoose');
const cors = require('cors');
require('dotenv/config');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const port = process.env.PORT;
const api = process.env.API_URL;

const AppError = require('./helpers/appError');
const globalErrorHandler = require('./controllers/errorController');

app.use(cors());
app.options('*', cors());

// set security HTTP headers00
app.use(helmet());


//middleware
app.use(bodyParser.json());

//middleware HTTP loggers details

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));}


    // limiting request from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Request limit reached! Please try again in an hour!',
});
app.use('/api', limiter);


//? serving static files
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/')));

    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, '/build', 'index.html'));
    // });
}


//? data sanitization against NoSQL query injection
app.use(mongoSanitize());

//? data sanitization against XSS
app.use(xss());


//improting routes
const applicantsRoutes = require('./routes/applicants');
const licenseRegistrationsRoutes = require('./routes/licenseRegistrations');
const usersRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');



//routers
app.use(`${api}/applicants`, applicantsRoutes);
app.use(`${api}/licenseRegistrations`, licenseRegistrationsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/admin`, adminRoutes);

//* error handling
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

//databse connectioni

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: 'LicenseDB'
})
.then(()=>{
    console.log('Database Connection is ready.....');
})

.catch((err)=>{
    console.log(err);
})

app.listen(port, ()=>{
    
    console.log('server is running http://localhost:3000');
})

