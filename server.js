const express=require('express');
const dotenv=require('dotenv')
const morgan=require('morgan')
const colors=require('colors')
const path=require('path')
const cookieParser=require('cookie-parser')
const mongoSanitize=require('express-mongo-sanitize')
const helmet=require('helmet')
const xss=require('xss-clean')
const rateLimit=require('express-rate-limit')
const hpp=require('hpp');
const cors=require('cors');

const connectDB=require('./config/db')
const i18n = require('./utils/i18n');
const notFound=require('./middleware/notFound')
const errorHandler=require('./middleware/error')



//load env vars
dotenv.config({path:'./config/config.env'});

const fileUpload=require('express-fileupload')

// connect to database
connectDB();

// load models
require('./models/User');
require('./models/Library');
require('./models/Book');

// Route Files
const books=require('./routes/books');
const users=require('./routes/users');
const borrow=require('./routes/borrowing');
const libraries=require('./routes/libraries');
const libraryInventory=require('./routes/libraryInventory')


const app=express();



// body parser:
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// Cookie parser
app.use(cookieParser())

// Enable i18n on every request
app.use(i18n.init);

// Dev logging middleware
if(process.env.NODE_ENV==='development')
{
    app.use(morgan('dev'))
}


// File uploading :
app.use(fileUpload());

// Sanitize data
//app.use(mongoSanitize());

// set security headers
//app.use(helmet({ contentSecurityPolicy: false }));

// Prevent XSS attacks
//app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
//app.use(limiter);

// Prevent http param pollution
//app.use(hpp())

//Enable CORS
app.use(cors())

// Set static folder 
app.use(express.static(path.join(__dirname,'public')));


//Mount routers
app.use('/api/v1/books',books);
app.use('/api/v1/users',users);
app.use('/api/v1',borrow);
app.use('/api/v1/libraries',libraries)
app.use('/api/v1',libraryInventory)


app.use(notFound)
app.use(errorHandler);


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold);
})