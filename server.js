const express=require('express');
const dotenv=require('dotenv')
const morgan=require('morgan')
const colors=require('colors')
const cookieParser=require('cookie-parser')

const connectDB=require('./config/db')
const notFound=require('./middleware/notFound')
const errorHandler=require('./middleware/error')



//load env vars
dotenv.config({path:'./config/config.env'});

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

// Dev logging middleware
if(process.env.NODE_ENV==='development')
{
    app.use(morgan('dev'))
}



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