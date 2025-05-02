const mongoose=require('mongoose');
const bookSchema=new mongoose.Schema({
   

    title:{
       type:String,
       trim:true,
       required:[true,'Please add a book title'],
       unique: true
    },
    description:{
        type:String,
        required:[true,'Please add a description']
    },

    cost:{
        type:Number,
        required:[true,'Please add a book cost']
    },

    photo: {
        type: String,
        default: 'no-photo.jpg'
     },


 
    library:{
        type:mongoose.Schema.ObjectId,
        ref:'Library',
        required:true,
    },
    author:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },

    borrower:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        default:null,
    },
    borrowedAt: {
        type: Date,
        default: null
    },
},{
    timestamps:true,
})


const bookModel=mongoose.model('Book',bookSchema);
module.exports=bookModel;