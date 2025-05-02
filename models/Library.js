const mongoose=require('mongoose');
const slugify=require('slugify')
const librarySchema=new mongoose.Schema({
  
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
     },
     slug: String,
     description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
     },
     website: {
        type: String,
        match: [
           /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
           'Please use a valid URL with HTTP or HTTPS'
        ]
     },
     phone: {
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters']
     },
     email: {
        type: String,
        match: [
           /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
           'Please add a valid email'
        ]
     },
     address: {
        type: String,
        required: [true, 'Please add an address']
     },
    
     user:{
      type:mongoose.Schema.ObjectId,
      ref:'User',
      required:true,
  },


},

{
   toJSON: { virtuals: true },
   toObject: { virtuals: true },
   timestamps: true
 }



)

// Create Library slug from the name
librarySchema.pre('save',function(next){
   this.slug=slugify(this.name,{lower :true});
   next();
})


// Cascade delete books when a library is deleted
librarySchema.pre('deleteOne', { document: true, query: false }, async function (next) {
   console.log(`books being removed from library ${this._id}`);
   await this.model('Book').deleteMany({ library: this._id });
   next();
 });


//Reverse populate with virtuals :
librarySchema.virtual('books',{
   ref:'Book',
   localField:'_id',
   foreignField:'library',
   justOne:false,
})

const libraryModel=mongoose.model('Library',librarySchema);
module.exports=libraryModel;