const fs=require('fs');
const mongoose=require('mongoose');
const colors=require('colors');
const dotenv=require('dotenv');

//load env vars
dotenv.config({path:'./config/config.env'});

// Load Models :
const Library=require('./models/Library');
const Book=require('./models/Book');
const User=require('./models/User')


// Connect to DB
mongoose.connect(process.env.MONGO_URI);

//Read Json Files :
const libraries=JSON.parse(fs.readFileSync(`${__dirname}/_data/libraries.json`,'utf-8'))
const books=JSON.parse(fs.readFileSync(`${__dirname}/_data/books.json`,'utf-8'))
const users=JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`,'utf-8'))

// Import into DB

const importData=async()=>{
    try{
       await Library.create(libraries);
       await Book.create(books);
       await User.create(users);
       console.log(`Data Imported......`.green.inverse)
       process.exit(0);
    }catch(err)
    {
        console.log(err);
        process.exit(1);
    }
}

// Delete Data

const deleteData=async()=>{
    try{
       await Library.deleteMany();
       await Book.deleteMany();
       await User.deleteMany();
       console.log(`Data Destroyed......`.red.inverse)
       process.exit(0);
    }catch(err)
    {
        console.log(err);
        process.exit(1);
    }
}

if(process.argv[2]==='-i')
{
    importData();
}
else if(process.argv[2]==='-d')
{
    deleteData();
}