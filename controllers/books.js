const asyncHandler=require('express-async-handler')
const ErrorResponse=require('../utils/errorResponse')
const uploadToCloudinary = require('../utils/cloudinaryUpload');
const Book=require('../models/Book');
const path=require('path')



// @desc   Get books
// @route  GET /api/v1/books
// @access Public


const getBooks=asyncHandler(async(req,res,next)=>{

  const __ = req.__.bind(req); 

    const books=await Book.find().populate('author', 'name email')
    .populate('borrower', 'name email')
    .populate('library', 'name description');;

    if(books.length===0)
    {
        return next(new ErrorResponse(__('books.not_found'), 404));
    }

    

    res.status(200).json({
        success:true,
        count:books.length,
        data:books,
    })
   

})

// @desc   Get Single book
// @route  GET /api/v1/books/:id
// @access Public


const getBook=asyncHandler(async(req,res,next)=>{
  const __ = req.__.bind(req);

    const book=await Book.findById(req.params.id).populate({
        path:'author',
        select:'name email'
    }).populate({
        path:'borrower',
        select:'name email'
    }).populate({
        path:'library',
        select:'name description'
    })

    if (!book) {
    return next(new ErrorResponse(__('books.single_not_found', req.params.id), 404));
  }
   
    res.status(200).json({
        success:true,
        data:book
    })
    

})


// @desc   Create new book
// @route  POST /api/v1/books
// @access Private
const createBook=asyncHandler(async(req,res,next)=>{
  const __ = req.__.bind(req);
  const book=await Book.create(req.body);

      res.status(201).json({
          success:true,
          message: __('books.created'),
          data:book
      })
  


})


// @desc   Update book
// @route  PUT /api/v1/book/:id
// @access Private
const updateBook=asyncHandler(async(req,res,next)=>{
  const __ = req.__.bind(req);
    let book = await Book.findById(req.params.id);

    if (!book) {
      return next(new ErrorResponse(__('books.single_not_found', req.params.id), 404));
    }

    book = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    
      res.status(200).json({
        success: true,
        message: __('books.updated'),
        data: book,
      });
   
})

// @desc   Delete book
// @route  DELETE /api/v1/book/:id
// @access Private
const deleteBook=asyncHandler(async(req,res,next)=>{

  const __ = req.__.bind(req);
   
    const book = await Book.findById(req.params.id);

    if (!book) {
      return next(new ErrorResponse(__('books.single_not_found', req.params.id), 404));
    }

     await Book.deleteOne();
    
      res.status(200).json({
        success: true,
        message: __('books.deleted'),
        data: {},
      });
   
});




// @desc   Upload Photo for book
// @route  PUT /api/v1/books/:id/photo
// @access Private
const bookPhotoUpload=asyncHandler(async(req,res,next)=>{
  const __ = req.__.bind(req);

  const book=await Book.findById(req.params.id)
  if(!book)
  {
    return next(new ErrorResponse(__('books.single_not_found', req.params.id), 404));
  }
  const file = req.file;
  if (!file) {
    return next(new ErrorResponse(__('file.file_missing'), 400));
  }
  
  // Upload to Cloudinary (or any other cloud service)
  const imageUrl = await uploadToCloudinary(file.data); // Send the file buffer
  console.log(imageUrl)
  
  await Book.findByIdAndUpdate(req.params.id,{photo:file.name});
  res.status(200).json({
      success: true,
      data: file.name
  })

  
 
 
});




module.exports={
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    bookPhotoUpload,
}
